import { Command } from 'commander';
import { platformUrls } from '@tryfy/shared';
import { pollDeviceCode, requestDeviceCode } from '../api/client.js';
import { SessionError } from '../utils/session.js';

export function createLoginCommand(): Command {
  return new Command('login')
    .description('Authenticate with the Tryfy platform using the device code flow')
    .option('-c, --code <code>', 'Provide a device code to skip polling prompts')
    .action(async (options: { code?: string }) => {
      try {
        if (options.code) {
          await pollDeviceCode(options.code);
          console.log('Successfully authenticated using provided device code.');
          return;
        }

        const { deviceCode, userCode, verificationUri } = await requestDeviceCode();
        console.log('Open the following URL and enter the code to authenticate:');
        console.log(`URL: ${verificationUri}`);
        console.log(`Code: ${userCode}`);
        console.log(
          `If the primary domain is unavailable, use: ${platformUrls.auth.deviceVerification.secondary}`
        );
        console.log('Polling for completion (simulated)...');
        await pollDeviceCode(deviceCode);
        console.log('Authentication complete. Your session is securely cached for future commands.');
      } catch (error) {
        if (error instanceof SessionError) {
          console.error(error.message);
          return;
        }

        throw error;
      }
    });
}
