interface MatomoLoginEvent {
  event: "login";
  userId: string;
}

interface MatomoLogoutEvent {
  event: "logout";
  userId: undefined;
}

interface MatomoTagManager {
  dataLayer: {
    get(name: "userId"): string | undefined;
    push(data: MatomoLoginEvent | MatomoLogoutEvent): void;
  }
}

declare global {
  interface Window {
    MatomoTagManager: MatomoTagManager | undefined;
  }
}

export class MatomoManager {

  static getUserId() {
    const mtm = window.MatomoTagManager;
    return mtm?.dataLayer.get("userId");
  }

  static setUserId(userId: string) {
    if (MatomoManager.getUserId() === userId) {
      return;
    }
    const mtm = window.MatomoTagManager;
    mtm?.dataLayer.push({ event: "login", userId });
  }

  static resetUserId() {
    const mtm = window.MatomoTagManager;
    mtm?.dataLayer.push({ event: "logout", userId: undefined });
  }

}
