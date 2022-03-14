import invariant from 'tiny-invariant'
import { WNATIVE } from '../../constants/tokens'
import { Currency } from '../Currency'
import { NativeCurrency } from '../NativeCurrency'
import { Token } from '../Token'

export class Metis extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'METIS', 'METIS')
  }

  public get wrapped(): Token {
    const wmetis = WNATIVE[this.chainId]
    invariant(!!wmetis, 'WRAPPED')
    return wmetis
  }

  private static _cache: { [chainId: number]: Metis } = {}

  public static onChain(chainId: number): Metis {
    return this._cache[chainId] ?? (this._cache[chainId] = new Metis(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
