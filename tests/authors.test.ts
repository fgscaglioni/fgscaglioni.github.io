import { describe, it, expect } from 'vitest';
import { highlightSelf, escapeHtml } from '../src/utils/authors';

const NOME = 'Scaglioni, F. G.';

describe('escapeHtml', () => {
  it('escapa os tres caracteres perigosos', () => {
    expect(escapeHtml('A & B <i>')).toBe('A &amp; B &lt;i&gt;');
  });
});

describe('highlightSelf', () => {
  it('marca o proprio nome em primeiro autor', () => {
    const out = highlightSelf('Scaglioni, F. G., Aguiar, M., and Mattos, J. C. B.');
    expect(out).toContain('<strong class="text-accent font-normal">Scaglioni, F. G.</strong>');
    expect(out).toContain('Aguiar, M.');
  });

  it('marca o proprio nome no meio da lista, com et al. depois', () => {
    const out = highlightSelf('Marins, E. F., Scaglioni, F. G., et al.');
    expect(out.match(/<strong/g)?.length).toBe(1);
    expect(out).toContain('Marins, E. F., <strong');
  });

  it('nao quebra a virgula interna do nome', () => {
    const out = highlightSelf('Scaglioni, F. G., Aguiar, M.');
    expect(out.startsWith('<strong class="text-accent font-normal">Scaglioni, F. G.</strong>, Aguiar'));
  });

  it('nao inventa marcacao quando o nome nao esta na lista', () => {
    const lista = 'Marins, E. F., Primo, T. T.';
    expect(highlightSelf(lista)).toBe(lista);
    expect(highlightSelf(lista)).not.toContain('<strong');
  });

  it('escapa HTML antes de marcar (nao injeta tag vinda do dado)', () => {
    const out = highlightSelf('Scaglioni, F. G. & <script>', NOME);
    expect(out).toContain('&amp;');
    expect(out).not.toContain('<script>');
  });

  it('marca tambem a forma curta do nome (sem o G.)', () => {
    const out = highlightSelf('Scaglioni, F., Aguiar, M.');
    expect(out).toBe(
      '<strong class="text-accent font-normal">Scaglioni, F.</strong>, Aguiar, M.',
    );
  });

  it('nao deixa " G." sobrando fora da marcacao quando as duas formas batem', () => {
    const out = highlightSelf('Scaglioni, F. G., Aguiar, M.');
    expect(out.match(/<strong/g)?.length).toBe(1);
    expect(out).not.toMatch(/<\/strong> G\./);
  });

  it('aceita nome configuravel', () => {
    expect(highlightSelf('Silva, A., Scaglioni, F. G.', 'Silva, A.')).toContain('<strong class="text-accent font-normal">Silva, A.</strong>');
  });
});
