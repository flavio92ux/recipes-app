export const metadata = {
  title: 'Contato | Receitas',
  description: 'Entre em contato conosco com suas dúvidas, sugestões ou feedback',
};

export default function ContatoPage() {
  return (
    <article className="prose lg:prose-xl max-w-none">
      <h1>Entre em Contato</h1>
      
      <p>
        Adoraríamos ouvir de você! Se você tem dúvidas, sugestões, feedback ou gostaria de
        compartilhar uma receita, entre em contato conosco através do formulário abaixo.
      </p>

      <section>
        <h2>Formulário de Contato</h2>
        <form className="space-y-4 not-prose">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="seu.email@exemplo.com"
            />
          </div>

          <div>
            <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-1">
              Assunto
            </label>
            <input
              type="text"
              id="assunto"
              name="assunto"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Assunto da sua mensagem"
            />
          </div>

          <div>
            <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              required
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Sua mensagem aqui..."
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition font-medium"
          >
            Enviar Mensagem
          </button>
        </form>
      </section>

      <section className="mt-8">
        <h2>Outras Formas de Contato</h2>
        <ul>
          <li>
            <strong>Email:</strong> contato@receitas.com.br
          </li>
          <li>
            <strong>Redes Sociais:</strong> Siga-nos nas redes sociais para dicas e novidades
          </li>
        </ul>
      </section>

      <section>
        <h2>Tempo de Resposta</h2>
        <p>
          Respondemos a todos os emails dentro de 2-3 dias úteis. Obrigado por entrar em contato!
        </p>
      </section>
    </article>
  );
}
