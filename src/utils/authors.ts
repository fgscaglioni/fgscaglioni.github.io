/** Escapa HTML: o resultado vai para dentro de `set:html`, entao o dado nunca
 *  pode carregar marcacao propria. */
export function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Marca o proprio nome dentro da lista de coautores.
 *
 * Por que existe: numa lista de dez nomes em mono 12px, o autor procura o dele
 * antes de qualquer outra informacao. Marcar e dar funcao ao acento — o unico
 * lugar do site em que um segundo tom carrega informacao em vez de decoracao.
 *
 * A virgula interna ("Scaglioni, F. G.") impede quebrar a string por virgula,
 * por isso a substituicao e pelo nome completo ja escapado.
 */
export function highlightSelf(
  authors: string,
  names: string | string[] = ['Scaglioni, F. G.', 'Scaglioni, F.'],
): string {
  const safe = escapeHtml(authors);
  const alvos = (Array.isArray(names) ? names : [names])
    .map(escapeHtml)
    .filter(Boolean)
    // mais longo primeiro: "Scaglioni, F. G." precisa vencer "Scaglioni, F."
    // na mesma posicao, senao sobra " G." fora da marcacao.
    .sort((a, b) => b.length - a.length);

  if (alvos.length === 0) return safe;

  const padrao = new RegExp(alvos.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
  return safe.replace(padrao, (m) => `<strong class="text-accent font-normal">${m}</strong>`);
}
