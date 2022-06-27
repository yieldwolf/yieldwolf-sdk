import invariant from 'tiny-invariant'
import { WNATIVE } from '../../constants/tokens'
import { Currency } from '../Currency'
import { NativeCurrency } from '../NativeCurrency'
import { Token } from '../Token'

export class Aurora extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'AURORA', 'AURORA')
  }

  public get wrapped(): Token {
    const waurora = WNATIVE[this.chainId]
    invariant(!!waurora, 'WRAPPED')
    return waurora
  }

  private static _cache: { [chainId: number]: Aurora } = {}

  public static onChain(chainId: number): Aurora {
    return this._cache[chainId] ?? (this._cache[chainId] = new Aurora(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
