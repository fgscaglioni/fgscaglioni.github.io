/**
 * Formatação de data de post.
 *
 * pubDate/updated são data de calendário, mas o Astro as entrega como Date à
 * meia-noite UTC. `toLocaleDateString("pt-BR")` sem timeZone converte para o
 * fuso do build (-03) e exibe o dia anterior em todos os posts. O timeZone
 * UTC fixo aqui impede a classe inteira de bug: página nova com data de post
 * chama esta função e herda o comportamento correto.
 */

export type PostDateStyle = "long" | "short";

const OPTIONS: Record<PostDateStyle, Intl.DateTimeFormatOptions> = {
  long: { year: "numeric", month: "long", day: "numeric" },
  short: { year: "numeric", month: "short" },
};

export function formatPostDate(date: Date, style: PostDateStyle = "long"): string {
  return date.toLocaleDateString("pt-BR", { ...OPTIONS[style], timeZone: "UTC" });
}
