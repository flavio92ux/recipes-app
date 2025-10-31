export const metadata = {
  title: 'Sobre | Receitas',
  description: 'Conheça mais sobre o site de receitas e nossa missão',
};

export default function SobrePage() {
  return (
    <article className="prose lg:prose-xl max-w-none">
      <h1>Sobre Nós</h1>
      
      <section>
        <h2>Bem-vindo ao Receitas</h2>
        <p>
          O Receitas é uma plataforma dedicada a compartilhar receitas deliciosas e fáceis de preparar
          para todos os níveis de habilidade culinária. Nosso objetivo é tornar a culinária acessível,
          divertida e inspiradora para todos.
        </p>
      </section>

      <section>
        <h2>Nossa Missão</h2>
        <p>
          Acreditamos que cozinhar deve ser uma experiência prazerosa e acessível. Nossa missão é
          fornecer receitas de qualidade, bem testadas e fáceis de seguir, que inspirem as pessoas
          a explorar novos sabores e técnicas culinárias.
        </p>
      </section>

      <section>
        <h2>O Que Oferecemos</h2>
        <ul>
          <li>Receitas variadas de diferentes categorias e cuisines</li>
          <li>Instruções claras e passo a passo</li>
          <li>Informações sobre tempo de preparo e rendimento</li>
          <li>Dicas e sugestões de ingredientes</li>
          <li>Busca fácil e navegação intuitiva</li>
        </ul>
      </section>

      <section>
        <h2>Comunidade</h2>
        <p>
          Somos uma comunidade de apaixonados por culinária. Se você tem uma receita favorita que
          gostaria de compartilhar ou sugestões para melhorar o site, adoraríamos ouvir de você!
          Entre em contato conosco através da página de contato.
        </p>
      </section>
    </article>
  );
}
