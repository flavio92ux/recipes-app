export const metadata = {
  title: 'Política de Privacidade | Receitas',
  description: 'Conheça nossa política de privacidade e como protegemos seus dados',
};

export default function PoliticaPrivacidadePage() {
  return (
    <article className="prose lg:prose-xl max-w-none">
      <h1>Política de Privacidade</h1>

      <p>
        <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}
      </p>

      <section>
        <h2>1. Introdução</h2>
        <p>
          Bem-vindo ao Receitas. Nós respeitamos sua privacidade e estamos comprometidos em proteger
          seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, divulgamos
          e salvaguardamos suas informações quando você visita nosso site.
        </p>
      </section>

      <section>
        <h2>2. Informações que Coletamos</h2>
        <p>Podemos coletar informações sobre você de várias formas, incluindo:</p>
        <ul>
          <li>
            <strong>Informações que você nos fornece:</strong> Nome, email e mensagens através do
            formulário de contato
          </li>
          <li>
            <strong>Informações de navegação:</strong> Dados sobre como você interage com nosso site,
            como páginas visitadas e tempo gasto
          </li>
          <li>
            <strong>Cookies:</strong> Usamos cookies para melhorar sua experiência no site
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Como Usamos Suas Informações</h2>
        <p>Usamos as informações coletadas para:</p>
        <ul>
          <li>Responder a suas consultas e mensagens</li>
          <li>Melhorar e otimizar nosso site</li>
          <li>Personalizar sua experiência de navegação</li>
          <li>Analisar o uso do site para fins estatísticos</li>
          <li>Cumprir com obrigações legais</li>
        </ul>
      </section>

      <section>
        <h2>4. Compartilhamento de Informações</h2>
        <p>
          Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto
          quando necessário para fornecer os serviços solicitados ou conforme exigido por lei.
        </p>
      </section>

      <section>
        <h2>5. Segurança de Dados</h2>
        <p>
          Implementamos medidas de segurança apropriadas para proteger suas informações pessoais contra
          acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de
          transmissão pela Internet é 100% seguro.
        </p>
      </section>

      <section>
        <h2>6. Cookies</h2>
        <p>
          Nosso site usa cookies para melhorar sua experiência. Você pode controlar o uso de cookies
          através das configurações do seu navegador. A maioria dos navegadores permite que você
          recuse cookies ou o alerte quando um cookie está sendo enviado.
        </p>
      </section>

      <section>
        <h2>7. Links para Terceiros</h2>
        <p>
          Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelas práticas
          de privacidade desses sites. Recomendamos que você revise a política de privacidade de
          qualquer site de terceiros antes de fornecer suas informações pessoais.
        </p>
      </section>

      <section>
        <h2>8. Seus Direitos</h2>
        <p>Você tem o direito de:</p>
        <ul>
          <li>Acessar suas informações pessoais</li>
          <li>Corrigir informações imprecisas</li>
          <li>Solicitar a exclusão de suas informações</li>
          <li>Optar por não receber comunicações de marketing</li>
        </ul>
      </section>

      <section>
        <h2>9. Alterações a Esta Política</h2>
        <p>
          Podemos atualizar esta Política de Privacidade periodicamente. Qualquer alteração será
          publicada nesta página com uma data de atualização revisada. Seu uso contínuo do site após
          as alterações constitui sua aceitação da Política de Privacidade revisada.
        </p>
      </section>

      <section>
        <h2>10. Entre em Contato</h2>
        <p>
          Se você tiver dúvidas sobre esta Política de Privacidade ou nossas práticas de privacidade,
          entre em contato conosco através da página de contato.
        </p>
      </section>
    </article>
  );
}
