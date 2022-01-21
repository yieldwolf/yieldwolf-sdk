import invariant from 'tiny-invariant'
import { WNATIVE } from '../../constants/tokens'
import { Currency } from '../Currency'
import { NativeCurrency } from '../NativeCurrency'
import { Token } from '../Token'

export class Moonbeam extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'GLMR', 'Moonbeam')
  }

  public get wrapped(): Token {
    const wglmr = WNATIVE[this.chainId]
    invariant(!!wglmr, 'WRAPPED')
    return wglmr
  }

  private static _cache: { [chainId: number]: Moonbeam } = {}

  public static onChain(chainId: number): Moonbeam {
    return this._cache[chainId] ?? (this._cache[chainId] = new Moonbeam(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
