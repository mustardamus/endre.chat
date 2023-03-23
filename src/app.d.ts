/// <reference types="@sveltejs/kit" />

interface SessionData {
  token: string;
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      session: import("svelte-kit-cookie-session").Session<SessionData>;
    }

    interface PageData {
      session: SessionData;
    }

    interface Platform {}

    interface PrivateEnv {}

    interface PublicEnv {}
  }
}

export {};
