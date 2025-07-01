import { Component } from "@angular/core";

@Component({
    selector: "app-terms",
    templateUrl: "./terms.component.html",
    styleUrls: ["./terms.component.css"]
})
export class TermsComponent {
    termos = [
        {
            chave: "Aceitação dos Termos",
            conteudo:
                "Ao acessar e utilizar a nossa plataforma, você concorda em cumprir e ficar vinculado aos seguintes Termos de Uso. Caso não concorde com qualquer parte destes termos, você não deve utilizar a plataforma."
        },
        {
            chave: "Descrição do Serviço",
            conteudo:
                "Nossa plataforma permite que casais criem uma convite/página personalizada preenchendo um formulário com informações do seu convite, podendo adicionar foto. Após o preenchimento, você é direcionado para o checkout e, ao concluir o pagamento, recebe um link com o convite via email."
        },
        {
            chave: "Cadastro e Segurança",
            conteudo:
                "Para utilizar o serviço, você deve fornecer um endereço de email válido. Não compartilharemos seu email com terceiros."
        },
        {
            chave: "Privacidade",
            conteudo:
                "Respeitamos a sua privacidade. Não utilizamos seus dados para qualquer tipo de processamento ou venda de dados para terceiros. O email cadastrado é utilizado apenas para o envio do link da página personalizada."
        },
        {
            chave: "Conteúdo do Usuário",
            conteudo:
                "Você é responsável pelo conteúdo que insere na plataforma, incluindo fotos, mensagens e informações do relacionamento. Não nos responsabilizamos por qualquer conteúdo impróprio ou ilegal carregado pelos usuários."
        },
        {
            chave: "Pagamentos e Reembolsos",
            conteudo:
                "Todos os pagamentos são processados através do Stripe. Após a conclusão do pagamento, você receberá um link para a página personalizada via email. Não oferecemos reembolsos, exceto em casos excepcionais a nosso exclusivo critério."
        },
        {
            chave: "Modificações no Serviço",
            conteudo:
                "Nós nos comprometemos a manter o serviço ativo e disponível pelo período contratado, conforme o plano escolhido (1 ano no plano básico ou tempo vitalício no plano avançado). No entanto, reservamo-nos o direito de modificar ou descontinuar o serviço em circunstâncias excepcionais. Caso seja necessário descontinuar o serviço, tomaremos todas as medidas possíveis para notificar os usuários com antecedência e garantir a preservação das páginas ou oferecer soluções alternativas sempre que possível."
        },
        {
            chave: "Limitação de Responsabilidade",
            conteudo:
                "Em nenhuma circunstância seremos responsáveis por qualquer dano indireto, incidental, especial ou consequente decorrente de ou relacionado ao uso ou incapacidade de uso da plataforma."
        },
        {
            chave: "Alterações nos Termos",
            conteudo:
                "Podemos atualizar estes Termos de Uso periodicamente. Quando fizermos isso, revisaremos a data da 'última atualização' no rodapé desta página. É sua responsabilidade revisar estes Termos de Uso periodicamente para se manter informado sobre quaisquer alterações."
        },
        {
            chave: "Contato",
            conteudo:
                "Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco pelo email: goinvity@gmail.com"
        }
    ];
}
