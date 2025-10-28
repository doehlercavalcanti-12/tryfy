import { z } from 'zod';

export const locales = ['en', 'pt', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const platformUrls = {
  domains: {
    primary: 'tryfy.fun',
    secondary: 'tryfy.online'
  },
  api: {
    production: 'https://api.tryfy.fun',
    staging: 'https://api.tryfy.online',
    development: 'https://api.tryfy.local'
  },
  web: {
    production: 'https://app.tryfy.fun',
    staging: 'https://app.tryfy.online'
  },
  auth: {
    deviceVerification: {
      primary: 'https://tryfy.fun/device',
      secondary: 'https://tryfy.online/device'
    }
  },
  payments: {
    checkoutBase: 'https://payments.tryfy.fun/checkout'
  }
} as const;

export const messages: Record<Locale, Record<string, string>> = {
  en: {
    'home.title': 'Welcome to Tryfy',
    'home.subtitle': 'Competitive arcade experiences in your browser.',
    'nav.login': 'Login',
    'nav.signup': 'Create account',
    'nav.store': 'Store',
    'nav.play': 'Play',
    'nav.leaderboard': 'Leaderboard',
    'nav.account': 'Account',
    'nav.admin': 'Admin',
    'nav.home': 'Home',
    'common.placeholderContent': 'This section is still under construction. APIs will be wired soon.',
    'common.yes': 'Yes',
    'common.no': 'No',
    'game.status': 'Status',
    'game.lastMatch': 'Last match',
    'login.title': 'Sign in',
    'login.description': 'Authenticate with your Tryfy account to access the platform.',
    'signup.title': 'Create your Tryfy account',
    'signup.description': 'Register to start playing and earning rewards.',
    'store.title': 'In-game store',
    'store.description': 'Purchase cosmetics, boosts and subscriptions.',
    'store.items.booster': 'XP Booster',
    'store.items.boosterDescription': 'Double your XP gain for the next 5 matches.',
    'store.items.skin': 'Cosmetic skin bundle',
    'store.items.skinDescription': 'Unlock exclusive character skins.',
    'play.title': 'Ready up',
    'play.description': 'Queue up for your next competitive match.',
    'play.matchmakingCopy': 'Matchmaking in progress. We will notify you when the lobby is ready.',
    'leaderboard.title': 'Global leaderboard',
    'leaderboard.description': 'Track top competitors across all regions.',
    'leaderboard.rank': 'Rank',
    'leaderboard.player': 'Player',
    'leaderboard.rating': 'Rating',
    'account.title': 'Account settings',
    'account.description': 'Manage your personal details and preferences.',
    'account.email': 'Email',
    'account.optIn': 'Marketing opt-in',
    'admin.title': 'Administrator control center',
    'admin.description': 'Review moderation queues and active sessions.'
  },
  pt: {
    'home.title': 'Bem-vindo à Tryfy',
    'home.subtitle': 'Experiências arcade competitivas no seu navegador.',
    'nav.login': 'Entrar',
    'nav.signup': 'Criar conta',
    'nav.store': 'Loja',
    'nav.play': 'Jogar',
    'nav.leaderboard': 'Ranking',
    'nav.account': 'Conta',
    'nav.admin': 'Admin',
    'nav.home': 'Início',
    'common.placeholderContent': 'Esta seção está em construção. Integrações chegarão em breve.',
    'common.yes': 'Sim',
    'common.no': 'Não',
    'game.status': 'Status',
    'game.lastMatch': 'Última partida',
    'login.title': 'Entrar',
    'login.description': 'Autentique-se com sua conta Tryfy para acessar a plataforma.',
    'signup.title': 'Criar conta Tryfy',
    'signup.description': 'Registre-se para começar a jogar e ganhar recompensas.',
    'store.title': 'Loja do jogo',
    'store.description': 'Compre cosméticos, bônus e assinaturas.',
    'store.items.booster': 'Impulsionador de XP',
    'store.items.boosterDescription': 'Dobre seu XP nas próximas 5 partidas.',
    'store.items.skin': 'Pacote de skins',
    'store.items.skinDescription': 'Desbloqueie skins exclusivas.',
    'play.title': 'Preparar',
    'play.description': 'Entre na fila para sua próxima partida competitiva.',
    'play.matchmakingCopy': 'Procurando partida. Avisaremos quando o lobby estiver pronto.',
    'leaderboard.title': 'Ranking global',
    'leaderboard.description': 'Acompanhe os melhores competidores de todas as regiões.',
    'leaderboard.rank': 'Posição',
    'leaderboard.player': 'Jogador',
    'leaderboard.rating': 'Pontuação',
    'account.title': 'Configurações da conta',
    'account.description': 'Gerencie seus dados pessoais e preferências.',
    'account.email': 'Email',
    'account.optIn': 'Permitir marketing',
    'admin.title': 'Painel administrativo',
    'admin.description': 'Revise filas de moderação e sessões ativas.'
  },
  es: {
    'home.title': 'Bienvenido a Tryfy',
    'home.subtitle': 'Experiencias arcade competitivas en tu navegador.',
    'nav.login': 'Iniciar sesión',
    'nav.signup': 'Crear cuenta',
    'nav.store': 'Tienda',
    'nav.play': 'Jugar',
    'nav.leaderboard': 'Clasificación',
    'nav.account': 'Cuenta',
    'nav.admin': 'Admin',
    'nav.home': 'Inicio',
    'common.placeholderContent': 'Esta sección aún está en construcción. Las integraciones llegarán pronto.',
    'common.yes': 'Sí',
    'common.no': 'No',
    'game.status': 'Estado',
    'game.lastMatch': 'Última partida',
    'login.title': 'Iniciar sesión',
    'login.description': 'Autentícate con tu cuenta Tryfy para acceder a la plataforma.',
    'signup.title': 'Crear cuenta Tryfy',
    'signup.description': 'Regístrate para empezar a jugar y ganar recompensas.',
    'store.title': 'Tienda del juego',
    'store.description': 'Compra cosméticos, potenciadores y suscripciones.',
    'store.items.booster': 'Potenciador de XP',
    'store.items.boosterDescription': 'Duplica tu XP durante las próximas 5 partidas.',
    'store.items.skin': 'Paquete de aspectos',
    'store.items.skinDescription': 'Desbloquea aspectos exclusivos.',
    'play.title': 'Listo para jugar',
    'play.description': 'Entra a la cola para tu siguiente partida competitiva.',
    'play.matchmakingCopy': 'Buscando partida. Te avisaremos cuando el lobby esté listo.',
    'leaderboard.title': 'Tabla global',
    'leaderboard.description': 'Sigue a los mejores competidores de todas las regiones.',
    'leaderboard.rank': 'Rango',
    'leaderboard.player': 'Jugador',
    'leaderboard.rating': 'Puntuación',
    'account.title': 'Configuración de la cuenta',
    'account.description': 'Administra tus datos personales y preferencias.',
    'account.email': 'Correo',
    'account.optIn': 'Suscripción a marketing',
    'admin.title': 'Centro de administración',
    'admin.description': 'Revisa las colas de moderación y sesiones activas.'
  }
};

export const ticketBalanceSchema = z.object({
  balance: z.number().int().nonnegative()
});

export const accountProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  marketingOptIn: z.boolean()
});

export type TicketBalance = z.infer<typeof ticketBalanceSchema>;
export type AccountProfile = z.infer<typeof accountProfileSchema>;
