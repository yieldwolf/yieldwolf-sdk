import invariant from 'tiny-invariant'
import { WNATIVE } from '../../constants/tokens'
import { Currency } from '../Currency'
import { NativeCurrency } from '../NativeCurrency'
import { Token } from '../Token'

export class Cronos extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'CRO', 'Cronos')
  }

  public get wrapped(): Token {
    const wcro = WNATIVE[this.chainId]
    invariant(!!wcro, 'WRAPPED')
    return wcro
  }

  private static _cache: { [chainId: number]: Cronos } = {}

  public static onChain(chainId: number): Cronos {
    return this._cache[chainId] ?? (this._cache[chainId] = new Cronos(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
