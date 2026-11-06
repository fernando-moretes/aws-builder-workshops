# Transcrições / Transcripts

Fernando: voz clonada dele, com autorização dele. Lia: personagem fictícia, voz sintética. Projeto independente, não é material oficial da AWS.

Fernando: his cloned voice, with his authorization. Lia: fictional character, synthetic voice. Independent project, not official AWS material.

## intro (pt)

**Lia:** Fernando, eu nunca usei AWS. Tenho até medo de começar.

**Fernando:** Normal, Lia. Você não precisa decorar nome de serviço. Você aprende testando, com a IA do seu lado, como tutora. Quem escreve e quem decide é você.

**Lia:** Tá, mas como funciona na prática?

**Fernando:** São quatro passos. Primeiro, uma dúvida real, com as suas palavras. Depois, um teste pequeno. Aí você guarda a evidência: o que você esperava e o que aconteceu. Por último, você escreve um artigo contando isso.

**Lia:** E quanto tempo leva?

**Fernando:** Cerca de uma hora por missão.

**Fernando:** São três missões, e cada uma começa com uma dúvida.

**Lia:** Qual é a primeira?

**Fernando:** Vou gastar sem querer? Na segunda: como coloco um site no ar com segurança? Na terceira: o que esse erro quer dizer?

**Lia:** Essa última sou eu toda semana.

**Fernando:** Então comece por ela. Comece pela que responde à sua dúvida de hoje.

**Lia:** Mas eu ainda não tenho conta na AWS.

**Fernando:** Não precisa, para começar. Os primeiros passos de cada missão rodam sem conta. Olha: com um comando, você já confere um relatório de custos de exemplo, com dados fictícios.

**Lia:** E se depois eu criar a conta?

**Fernando:** Cada missão ensina a limpar o que você criou.

**Lia:** E essa tutora? Posso pedir para ela fazer tudo?

**Fernando:** Ela é tutora. Faz perguntas, revisa e explica. Mas ela erra, e pegar esse erro faz parte do exercício. Confira os números, abra os links e escreva com as suas palavras.

**Lia:** Combinado. Vamos lá?

**Fernando:** Vamos lá.

**Fernando:** Um aviso antes de terminar. Minha narração foi gerada com a minha voz clonada, com a minha autorização. A personagem Lia é fictícia, com voz sintética. E este é um projeto independente. Não é material oficial da AWS.

## missao-1 (pt)

**Lia:** Fernando, se eu criar uma conta na AWS, vou levar um susto na fatura?

**Fernando:** Essa é a dúvida desta missão. Leva cerca de 1 hora e não custa nada. E os três primeiros passos você faz sem conta.

**Fernando:** Antes de abrir qualquer ferramenta, escreva a sua hipótese. O que você acha que gera mais custo em uma conta pequena?

**Lia:** Hum. Acho que é o servidor.

**Fernando:** Anote isso. Pode errar. É o erro que vira um bom artigo.

**Fernando:** Agora baixe o arquivo de custos de exemplo. Os dados são fictícios. Cole no seu assistente de IA, com este pedido.

**Lia:** Por que o último item diz: não me dê a conclusão pronta?

**Fernando:** Porque você quer perguntas, e não uma resposta para copiar.

**Fernando:** Agora confira a conta sem a IA, com este comando.

**Lia:** Nossa. Foi de 0,92 USD para 25,63 USD!

**Fernando:** Agora olhe a primeira linha da lista.

**Lia:** NAT Gateway? 16,20 USD. E eu apostei no servidor.

**Fernando:** Sua hipótese caiu. O servidor EC2 ficou em segundo. Anote isso, porque é a melhor parte do seu artigo.

**Lia:** E como eu sei se a IA acertou?

**Fernando:** Faça três perguntas. Os totais batem? Ela percebeu que o maior aumento é o NAT Gateway? Ela afirmou algum preço que não estava no arquivo? Se afirmou, peça a fonte e abra o link.

**Lia:** Então o que não bateu...

**Fernando:** É a sua melhor evidência.

**Lia:** E quando eu tiver conta, como fico tranquila?

**Fernando:** Crie um alerta de gastos. Os comandos estão na missão e rodam na CloudShell, o terminal que já vem no navegador. No fim, você confere assim. Ele avisa quando o gasto real passa de 80% de US$ 5, e quando a previsão passa de US$ 5.

**Lia:** Aí, se passar, ele desliga tudo sozinho?

**Fernando:** Não. Esse é o ponto que mais confunde. O alerta avisa, mas não bloqueia. Se chegar um e-mail, é com você. Eu recomendo manter esse alerta, porque é gratuito e protege a conta.

**Lia:** E o artigo? Como eu começo?

**Fernando:** Você já tem ele na mão. O tema é como evitar susto na conta. A evidência é sua: a hipótese, a resposta da IA, a saída do comando e o que não bateu.

**Lia:** E quem escreve o texto?

**Fernando:** Você. A inteligência artificial só revisa.

**Fernando:** Um aviso antes de terminar. Minha narração foi gerada com a minha voz clonada, com a minha autorização. A personagem Lia é fictícia, com voz sintética. E este é um projeto independente. Não é material oficial da AWS.

## missao-2 (pt)

**Lia:** Fernando, como eu coloco um site na internet pela AWS sem deixar nada aberto por engano?

**Fernando:** Essa é a dúvida de hoje. Leva cerca de 1 hora, e os três primeiros passos você faz sem conta. Antes de perguntar à IA, anote o que você acha.

**Fernando:** Cole este pedido no seu assistente de IA. Repare no último item: você pede o link da documentação oficial para cada resposta.

**Lia:** E aí é só confiar no link?

**Fernando:** Não. Aí vem a parte mais importante: abrir esses links. Não basta o link existir. Ele precisa dizer o que a IA afirmou.

**Lia:** A IA sugeriu um bucket S3 público. Parece fácil.

**Fernando:** Olhe o que a própria documentação do S3 diz. Esse caminho exige desligar o Block Public Access. Ela também recomenda manter esse bloqueio ligado. E avisa que o site no S3 só tem HTTP.

**Lia:** A IA não me contou nada disso.

**Fernando:** Então anote. Essa é a sua melhor evidência.

**Fernando:** Agora baixe a página da missão, troque o texto pelo seu e rode este comando. Depois, abra no navegador.

**Lia:** Posso pedir para a IA escrever o texto?

**Fernando:** Peça só para revisar a clareza. E cuidado: não coloque telefone, endereço nem nada que você não queira público.

**Lia:** E para publicar de verdade?

**Fernando:** Se você já tem conta, use o Amplify. Coloque o arquivo em um zip. Compacte o arquivo, e não a pasta, porque zipar a pasta causa erro de acesso negado. No console, crie um app sem Git, solte o zip e salve.

**Lia:** E demora?

**Fernando:** No nosso teste, cerca de 48 s, e o site respondeu com HTTPS sem configuração extra. Uma ressalva: esse teste foi pela linha de comando, com o mesmo tipo de envio. Os cliques no console seguem a documentação, sem teste passo a passo.

**Lia:** E depois, deixo lá?

**Fernando:** Se era só um teste, apague o app no console do Amplify. Depois abra o endereço e confirme que saiu do ar. O custo normalmente é zero nesse tamanho, mas confira na sua conta, porque o nível gratuito muda.

**Lia:** Agora eu tenho o que contar, né?

**Fernando:** Tem. Você comparou o que a IA sugeriu com o que a documentação diz. Publicou um site com HTTPS. E limpou no fim. A IA só revisa.

**Fernando:** Um aviso antes de terminar. Minha narração foi gerada com a minha voz clonada, com a minha autorização. A personagem Lia é fictícia, com voz sintética. E este é um projeto independente. Não é material oficial da AWS.

## missao-3 (pt)

**Lia:** Fernando, quando dá erro, eu travo. Como eu descubro sozinha o que ele quer dizer?

**Fernando:** Nesta missão, você quebra uma função de propósito. Olhe este código. Ele pede um campo chamado nome. O que acontece se ele receber um evento vazio? E qual código de status você espera?

**Lia:** Acho que vai dar erro. Uns 500?

**Fernando:** Anote a sua hipótese. Vamos testar.

**Fernando:** Baixe os dois arquivos da missão e rode este comando. Só precisa de Python, sem conta na AWS.

**Lia:** Apareceu um erro, com a palavra nome.

**Fernando:** Ou seja, o código procurou o campo nome, e ele não veio.

**Lia:** Posso colar o erro na IA e pedir a correção?

**Fernando:** Peça diferente. Cole este pedido, com o código e o erro. Ela aponta a linha e faz uma pergunta. Quando você entender a causa, corrija você mesma.

**Lia:** O que a função deveria fazer quando o nome não vem?

**Fernando:** Exato. Essa é a pergunta.

**Fernando:** Se você tem conta, crie a função na AWS. Os comandos estão na página da missão. Depois, chame a função com um evento vazio.

**Lia:** Fernando, olha isso. Deu erro, e mesmo assim a resposta veio com status 200. Como assim?

**Fernando:** Essa foi a resposta real no nosso teste. StatusCode 200. Logo ao lado: FunctionError, Unhandled. E dentro do arquivo: KeyError.

**Fernando:** Esse é o ponto da missão. O 200 diz que a chamada ao serviço Lambda funcionou. O erro da sua função está em FunctionError.

**Lia:** Então quem olha só o status acha que deu tudo certo.

**Fernando:** Exatamente.

**Fernando:** Espere uns 15 segundos e leia o log.

**Lia:** Mostra o erro e a linha 5.

**Fernando:** Agora pergunte à sua IA, sem mostrar esta missão: se o StatusCode voltou 200, a minha função rodou sem erro? Peça a documentação. Ela percebeu a diferença? O link confirma? Abra e anote.

**Lia:** E no fim, o que eu apago?

**Fernando:** A missão traz os comandos para apagar a função, a role e o grupo de logs. A última linha precisa mostrar colchetes vazios.

**Lia:** E aí eu escrevo o artigo?

**Fernando:** Isso. Minha Lambda respondeu 200 e estava quebrada. Esse título já conta a história. A IA só revisa.

**Fernando:** Um aviso antes de terminar. Minha narração foi gerada com a minha voz clonada, com a minha autorização. A personagem Lia é fictícia, com voz sintética. E este é um projeto independente. Não é material oficial da AWS.

## audio-primeiro-artigo (pt)

**Fernando:** Oi, aqui é o Fernando. Hoje a Lia está comigo. Ela é uma estudante que nunca usou AWS, e vai me fazer as perguntas que você faria.

**Lia:** Oi. Minha primeira pergunta é simples. São três missões. Por qual eu começo?

**Fernando:** Pela dúvida que você tem hoje. A primeira é: vou gastar sem querer? A segunda é: como coloco um site no ar com segurança? A terceira é: o que esse erro quer dizer?

**Lia:** Eu tenho medo de criar a conta. Isso conta como dúvida?

**Fernando:** Conta, e é uma ótima. Então eu começaria pela primeira. Leva cerca de 1 hora, não custa nada, e os três primeiros passos nem precisam de conta. Você termina sabendo ler um relatório de custos.

**Lia:** E se eu quiser ter algo para mostrar?

**Fernando:** Aí vá para a segunda. No fim, você pode ter um site seu, com HTTPS. E, se o que mais trava você é erro na tela, vá para a terceira. Ela ensina a ler log, e isso serve em qualquer sistema.

**Lia:** Tá, escolhi. Agora eu abro a IA?

**Fernando:** Ainda não. Abra um arquivo em branco e escreva a sua hipótese. O que você acha que vai acontecer? Na missão um: o que gera mais custo em uma conta pequena? Na missão três: o que acontece com um evento vazio?

**Lia:** E se eu errar? Vou ficar com vergonha de escrever isso depois.

**Fernando:** Pode errar. Eu até prefiro. Sem a hipótese escrita, depois todo resultado parece óbvio. E é o erro que vira um bom artigo. Quem lê vai reconhecer o mesmo chute que também teria dado.

**Lia:** Faz sentido. E quando a IA entra?

**Fernando:** Agora. E aqui eu tenho uma regra: ela é tutora, não é autora. Você pede explicação, pede perguntas, pede o link da documentação. Mas não pede o texto pronto. Um dos pedidos das missões diz: não me dê a conclusão pronta.

**Lia:** E como eu sei se ela acertou?

**Fernando:** Você confere. Na missão um, você roda um comando que soma o arquivo sem IA nenhuma. O total vai de 0,92 USD para 25,63 USD. O maior aumento é o NAT Gateway. Aí você volta na resposta da IA e olha se ela viu isso.

**Lia:** E se ela citou um link?

**Fernando:** Abra. Não basta o link existir. Ele precisa dizer o que ela afirmou. Na missão dois, é a própria documentação do S3 que diz que esse caminho exige desligar o Block Public Access, e recomenda mantê-lo ligado.

**Lia:** Então o que não bateu vira conteúdo?

**Fernando:** Vira a sua melhor evidência. Você não está competindo com a documentação. Não precisa explicar a AWS inteira. Só precisa contar o que testou, o que esperava e o que aconteceu.

**Lia:** Mas eu nunca escrevi um artigo técnico. Por onde começo?

**Fernando:** Cada missão termina com uma tabela de cinco campos: tema, público, problema, objetivo e evidências. Preencha com as suas palavras. Na missão três, o tema pode ser: minha Lambda respondeu 200 e estava quebrada.

**Lia:** Esse título eu leria.

**Fernando:** Pois é. Depois, escreva o primeiro rascunho sozinha. Pode ficar ruim. Comece pela sua dúvida. Mostre a hipótese. Mostre o comando e a saída real. Diga o que surpreendeu você. E termine dizendo o que esse teste não prova.

**Lia:** E aí ela pode revisar?

**Fernando:** Aí sim. Peça para ela apontar o que ficou confuso e marcar os números sem fonte. Se ela sugerir uma frase mais clara, e a ideia for sua, tudo bem. Se ela trouxer um fato novo, confira antes de usar.

**Lia:** Como eu sei que o texto ainda é meu?

**Fernando:** Com um teste simples. Toda afirmação do texto, você precisa saber explicar sem a IA. Se você não souber responder, essa frase ainda não é sua. Volte e teste, ou tire do texto.

**Lia:** Tem mais alguma coisa antes de publicar?

**Fernando:** Duas. Primeiro, a limpeza: apague o que era só teste, e confira. Segundo, os dados: nenhuma chave, nenhum número de conta, nada de telefone ou endereço, nem no texto, nem no print.

**Lia:** Então: uma dúvida minha, um teste pequeno, a evidência e um texto escrito por mim.

**Fernando:** É isso. Não precisa ser grande. Precisa ser verdadeiro, e outra pessoa precisa conseguir repetir. Escolha uma missão hoje e escreva a sua hipótese. Só isso já é o começo.

**Fernando:** Um aviso antes de terminar. Minha narração foi gerada com a minha voz clonada, com a minha autorização. A personagem Lia é fictícia, com voz sintética. E este é um projeto independente. Não é material oficial da AWS.

# English (Fernando only, OmniVoice)

Fernando's cloned voice, with his authorization. There is no Lia in the English versions. Independent project, not official AWS material.

## intro (en)

Hi, this is Fernando. If you have never used AWS, this video is for you. The idea is simple. You learn by testing, not by memorizing service names. AI sits next to you, as a tutor. But you are the one who writes and decides.

Here's how it works. First, a real question, in your own words. Then, a small test. Next, you keep the evidence: what you expected and what happened. Finally, you write an article about it. Each mission takes about one hour.

There are three missions. In the first, the question is: will I spend money by accident? In the second: how do I put a site online safely? In the third: what does this error mean? Start with the one that answers your question today.

And you don't need an AWS account to start. The first steps of every mission run without one. With one command, you can already check a sample cost report, with fictional data. If you move to AWS later, every mission shows you how to clean up what you created.

There's just one rule. AI is the tutor. It asks questions, reviews and explains. But it makes mistakes, and catching them is part of the exercise. So check the numbers, open the links and write in your own words. Shall we start?

One note before we finish. The voice you just heard was generated from my cloned voice, with my authorization. And this is an independent project. It is not official AWS material.

## missao-1 (en)

If I create an AWS account, will my bill surprise me? That's the question in this mission. It takes about an hour and costs nothing. And you can do the first three steps without an account.

Before opening any tool, open a file and write this down. What do you think costs the most in a small account? You can be wrong. Being wrong is what makes a good article.

Now download the sample cost file. The data is fictional. Paste it into your AI assistant with this request. Notice the last item: don't give me the conclusion. You want questions, not an answer to copy.

Now check the math without AI, using this command. The total went from 0.92 USD to 25.63 USD. And look at the first line of the list. The biggest increase is the NAT Gateway, at 16.20 USD. It's not the EC2 server.

Now compare. Do the AI's totals match? Did it notice that the biggest increase is the NAT Gateway? Did it state a price that wasn't in the file? If so, ask for the source and open the link. Write it all down. What didn't match is your best evidence.

If you already have an account, create a spending alert. The commands are in the mission and run in CloudShell, the terminal that comes in your browser. At the end, you check it like this. It warns you when actual spending passes 80% of US$ 5. And when the forecast passes US$ 5.

And here's the part that confuses people most. The alert warns you, but it doesn't block anything. It doesn't turn anything off by itself. If an email arrives, it's up to you. I recommend keeping this alert, because it's free and protects the account. The command to delete it is also in the mission.

That's it, you already have an article in your hands. The topic is how to avoid billing surprises. The evidence is yours: the hypothesis, the AI's answer, the command output and what didn't match. Write it in your own words. AI only reviews.

One note before we finish. The voice you just heard was generated from my cloned voice, with my authorization. And this is an independent project. It is not official AWS material.

## missao-2 (en)

How do I put a site online with AWS without leaving anything open by mistake? That's today's question. It takes about an hour. And you can do the first three steps without an account. Before asking AI, write down what you think.

Paste this request into your AI assistant. Notice the last item. You ask for the official documentation link behind each answer. Then comes the most important part of the mission: opening those links. It's not enough for a link to exist. It has to say what the AI claimed.

Many answers suggest a public S3 bucket. Look at what the S3 documentation itself says. That path requires turning off Block Public Access. It also recommends keeping that block on. And it warns that the S3 website only has HTTP. Did your AI tell you that? Write down what matched and what didn't.

Now download the mission's page and replace the text with yours. Run this command and open it in your browser. Ask AI to review the clarity, without writing it for you. And be careful: don't include your phone, your address or anything you don't want public.

If you already have an account, publish with Amplify. Put the file in a zip. Zip the file, not the folder, because zipping the folder causes an access denied error. In the console, create an app without Git, drop the zip and save. In our test, it took about 48 s, and the site answered over HTTPS with no extra setup.

An honest caveat. That test ran from the command line, with the same kind of zip upload. The console clicks follow the documentation, but they weren't tested step by step. If something looks different on your screen, write it down. That's evidence too.

If the site was just a test, delete it. In the Amplify console, open the app and go to settings, to the option that deletes the app. Then open the address again and confirm it's offline. The cost is normally zero at this size, but check your account, because the free tier changes.

And now you have a story to tell. You compared what AI suggested with what the documentation says. You published a site with HTTPS. And you cleaned up at the end. That's an article you can write on your own, in your own words. AI only reviews.

One note before we finish. The voice you just heard was generated from my cloned voice, with my authorization. And this is an independent project. It is not official AWS material.

## missao-3 (en)

What does this error mean, and how do I figure it out on my own? In this mission, you break a function on purpose. Look at this code. It asks for a field called nome, which means name. Now write this down: what happens if it gets an empty event? And what status code do you expect?

Download the mission's two files and run this command. You only need Python, no AWS account. An error shows up: KeyError, and the name of the field. In other words, the code looked for the field called nome, and it wasn't there.

Now use AI as a tutor. Paste this request, with the code and the error. Notice: you ask it not to give you the fix. It points to the line and asks you a question. Once you understand the cause, fix it yourself. What should the function do when the name is missing?

If you already have an account, create the function on AWS. The commands are in the mission. Then call it with an empty event. This was the real response in our test. Look at the detail. StatusCode 200. Right next to it: FunctionError, Unhandled. And inside the file: KeyError.

That's the point of this mission. The status is 200, and the function still failed. The 200 says the call to the Lambda service worked. Your function's error is in FunctionError. If you only look at the status, you think everything went fine.

Wait about 15 seconds and read the log. It shows the error and line 5. Now ask your AI, without showing it this mission: if the StatusCode came back 200, did my function run without errors? Ask for the documentation. Did it notice the difference? Does the link confirm it? Open it and write it down.

At the end, clean up. The mission has the commands to delete the function, the role and the log group. The last line has to show empty brackets. That means the function is off the list. Then write your article: my Lambda returned 200 and it was broken. AI only reviews.

One note before we finish. The voice you just heard was generated from my cloned voice, with my authorization. And this is an independent project. It is not official AWS material.

## audio-primeiro-artigo (en)

Hi, this is Fernando. I want to talk to you about two things. How to choose your first mission. And how to turn your test into an article of your own. No rush, and no pretending you already know everything.

Let's start with the choice. There are three missions, and each one starts from a question. The first is: will I spend money by accident? The second is: how do I put a site online safely? The third is: what does this error mean?

Here's how I'd choose. If you're afraid of creating the account, start with the first one. It takes about an hour, costs nothing, and the first three steps don't even need an account. You finish knowing how to read a cost report.

If you want something to show, go to the second one. At the end, you can have your own site, with HTTPS. And along the way, you learn to distrust shortcuts. If what blocks you most is errors on the screen, go to the third one. It teaches you to read logs, and that works on any system.

There's an even better criterion. Choose the question you really have today. Not the one that sounds most impressive. An article about a real question comes more easily. Because you don't have to fake interest.

Chosen? Then the first step isn't opening AI. It's opening a blank file and writing your hypothesis. What do you think will happen? In mission one: what costs the most in a small account? In mission three: what happens with an empty event?

You can be wrong. Really. I'd even prefer it. Because without a written hypothesis, every result looks obvious afterwards. And being wrong is what makes a good article. Whoever reads it will recognize the same guess they would have made.

Now AI comes in. And here I have a rule. It's a tutor, not an author. You ask for explanations, for questions, for the documentation link. But you don't ask for the finished text. In the missions, the requests are already written that way. One of them says: don't give me the conclusion.

Then you check. This is the part I like most. In mission one, you run a command that adds up the file with no AI at all. The total goes from 0.92 USD to 25.63 USD. The biggest increase is the NAT Gateway. Then you go back to the AI's answer and see if it noticed.

If it cited a link, open it. It's not enough for the link to exist. It has to say what the AI claimed. In mission two, the S3 documentation itself says a public bucket requires turning off Block Public Access, and recommends keeping it on. Did your AI tell you that? Write it down.

What didn't match is your best evidence. That's the secret of the article. You're not competing with the documentation. You don't have to explain all of AWS. You only have to tell what you tested, what you expected and what happened.

So, how do you write it? Each mission ends with a five-field table. Topic, audience, problem, goal and evidence. Fill it in with your own words. For example, in mission three, the topic could be: my Lambda returned 200 and it was broken. That title already tells a story.

Then write the first draft. On your own. It can be bad. A bad draft is normal. Start with your question. Show your hypothesis. Show the command and the real output. Say what surprised you. And end by saying what this test doesn't prove.

Now AI comes back, only to review. Ask it to point out what got confusing. Ask it to question how you observed each thing. Ask it to flag numbers with no source. If it suggests a clearer sentence and the idea is yours, that's fine. If it brings a new fact, check it before using it.

And here's a simple test. You have to be able to explain every claim in your text without AI. If someone asks, you answer. If you can't answer, that sentence isn't yours yet. Go back and test it, or take it out.

Before publishing, check two more things. First, cleanup. If you created something on AWS, delete what was only a test, and verify it. Second, your data. No keys, no account numbers, no phone or address, not in the text and not in the screenshots.

That's it. A question of yours, a small test, the evidence and a text written by you. It doesn't have to be long. It has to be true, and someone else has to be able to repeat it. Choose a mission today and write your hypothesis. That alone is the start.

One note before we finish. The voice you just heard was generated from my cloned voice, with my authorization. And this is an independent project. It is not official AWS material.
