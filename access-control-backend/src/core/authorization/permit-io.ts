import { Permit } from 'permitio';

export type PermitIoConfig = {
  token: string;
  pdp: string;
};

export class PermitIo {
  private static instance: Permit;

  private constructor(config: PermitIoConfig) {
    PermitIo.instance = new Permit({
      token: config.token,
      pdp: config.pdp,
    });
  }

  public static getInstance(config: PermitIoConfig): Permit {
    if (!PermitIo.instance) {
      PermitIo.instance = new Permit(config);
    }

    return PermitIo.instance;
  }
}
