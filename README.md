# spaceshooter
# CG-ISPTEC
Trabalho de CG

# Avaliação I
A avaliação da primeira parte do trabalho será realizada na semana de 17 a 22 de Outubro e
corresponde a 6 valores da nota do laboratório.

# Tarefas 
1. Modelar em Three.js os seguintes objectos (Nave do vilão e a Nave do heroi, 
juntamamente com detalhes para melhorar a cena esteticamente). [2,0 valores]

2. Definir também uma câmara fixa com uma vista de topo sobre a cena utilizando uma 
projecção ortogonal que mostre toda a cena usando a tecla ‘1’. [1,0 valores]

3. Definir mais duas câmaras fixas com vistas lateral e frontal utilizando sempre 
projecções ortogonais. Para selecionar qual das câmaras está activa usam-se as teclas 
‘1’ a ‘3’. A representação visual destes objectos deve alternar entre modelo de arames 
e sólida usando a tecla ‘4’ (Ver exemplo 3 dos exercicios, Tecla ‘A’). [1 valores].

4. Permitir ao utilizador movimentar a nave do heroi com o teclado utilizando as teclas 
das setas para virar para esquerda ‘ <- ‘ e direita ‘->’. Nave do heroi deve apresentar 
um movimento a velocidade constante, sendo a direcção do movimento dada por um 
vector tridimensional. O cálculo da movimento deve ter em consideração que o 
utilizador pode carregar em várias teclas em simultâneo além de levar em 
consideração o atrito (Usar a física). A nave do vilão deve mover-se sozinha de um 
extremo da cena a outro (Movimento deve ser aleatorio). [2 valores].

--------------------------------------------------------------------------------------------------------------------------------------------------

# Avaliação II
A avaliação do segundo trabalho será realizada na semana de 29 de Novembro e 
corresponde a 5 valores da nota do laboratório. 

# As tarefas do segundo trabalho são as seguintes: 

1. Criar um campo de jogo composto por uma cerca com quatro paredes com uma altura “H” e largura ‘L’ 
As seguintes características devem ser seguidas:

a) A altura das paredes deve ser tal que não permita que as naves dos 
inimigos e heroi saiam da cerca.

b) Deverá replicar a nave do inimigo para pelo menos 7 naves inimigas 
(Pode mudar as cores ou outras componentes), as naves devem mover-se 
aleatoriamente e seguinto direções diferentes quando colididas.

c) Cerca deverá ser enquadrada com o tamanho da cena, ou seja, a cerca 
deverá ter largura e área suficiente para a logíca do jogo. Tem que existir 
espaço suficiente para as naves inimigas moverem-se aleatoriamente 
além de espaço suficiente para movimento da nave do heroi. 
# Exemplo: 
caso comprimento total da nave heroi for de 2 cm, então tem limite de 
movimento de pelo menos 12cm (para esquerda e direita). Caso a nave 
também nove-se para frente, então podera mover-se ate 8cm para frente. 
Mas nunca colidindo com as naves inimigas, ou seja a nave heroi não pode 
se aproximar totalmente das do inimigo (Dica: Criar uma linha invisivel ou 
um limite de movimento).

d) As bolas (podera ser outro tipo de disparo) são disparadas por três 
canhões, tendo cada canhão a sua direção de disparo e devem estar todos 
imbutidos na nave do heroi. A nave do inimigo apenas tem um canhão e 
deverá estar no centro da nave inimiga.

e) Os canhões podem ser modelados recorrendo a um cilindro (Podera ser 
outro mas primeiro deve consultar o professor).

f) As bolas são disparadas sobre o piso e não devem saltar, deslocando-se 
sempre sobre o solo. As bolas devem rodar sobre si mesmas na 
direção do seu deslocamento. 

g) As teclas “Q(q)”, “W(w)”, “E(e)”, quando ativadas, devem acionar um dos 
três canhões que dispara uma bola. 

h) O canhão selecionado dever ter uma cor diferente dos restantes.

i) O disparo do canhão deve ser efetuado usando a tecla “space”.

2. Definir uma câmara fixa com uma vista de topo sobre a cena utilizando uma 
projeção ortogonal que mostre toda a cena (tecla “1”). [1,5 valores]. Definir 
ainda duas câmaras adicionais tendo o cuidado de manter a câmara definida 
anteriormente. Deve ser possível alternar entre as três câmaras utilizando as 
teclas “1”, “2” e “3” (Parecido a entrega anterior). A câmara 2 deve ser fixa e 
permitir visualizar todo o terreno de jogo através de uma projeção 
perspetiva. A câmara 3 deve também utilizar uma projeção perspetiva mas é 
móvel. Esta deve estar colocada atrás de uma bola e acompanhar o seu 
movimento (essa bola deve ser visível). Também precisa adicionar uma 
camera movel que percorre a cena ou cerca toda em 360º [1,5 valores]

3. Realizar o movimento das bolas. Este deve ser um movimento retilíneo 
uniformemente retardado. Mais especificamente, após algum tempo 
decorrido sobre a colisão, as bolas devem parar, ou seja, há perda de energia 
cinética. Para isso deve ser pré-definido um valor para a força de atrito.
(Depois de 3s das bolas estarem paradas então devem desaparecer da cena).
Deve-se detetar e tratar a colisão das bolas. 

# As colisões podem ser: 
(i) bolabola
(ii) bola-parede, 
(iii) Bola- inimigo. 

Na primeira (colisão bola-bola), esta deve tratada usando esferas envolventes. 
Na segunda (bola-parede), esta deve ser tratada usando bounding boxes alinhadas, ou usando limites. 

# Nota: 
Caso uma bola colida com uma parede, a bola deve ricochetear nesta, ficando a parede imóvel. 
No caso de colisão bola-bola, esta deve ser uma colisão elástica. 

(iv) Cada inimigo pode apenas ser atingido ou colidir com duas 
bolas, a vida do inimigo é equivalente a colição de 2 bolas de canhões 
diferentes ou iguais.
--------------------------------------------------------------------------------------------------------------------------------------------------

# Avaliação III
A avaliação do terceiro trabalho será realizada na semana de 3 de Janeiro e
corresponde a 5 valores da nota do laboratório.

# As tarefas do terceiro trabalho são as seguintes: 

1. Devem ser definidos 3 tipos de materiais (MeshBasicMaterial,
MeshLambertMaterial, MeshPhongMaterial) por cada objecto que
compoem as naves inimigas. A nave do herói deve ter 2 tipos de
materiais (MeshBasicMaterial, MeshLambertMaterial). As paredes
que compoem a cena deve ter 3 tipos de materiais
(MeshBasicMaterial, MeshLambertMaterial, MeshPhongMaterial). ).
[1,0 valores]
2. Criar a iluminação global da cena recorrendo a uma fonte de luz
direccional. Esta fonte de luz deve poder ser ligada ou desligada
através da uma tecla (‘Q(q)’). Adicionalmente, deve ser possível
activar e desactivar o cálculo da iluminação usando uma tecla
(‘W(w)’). Deve ser ainda possível alternar o tipo de sombreamento
entre Gouraud (diffuse) e Phong usando uma tecla (‘E(e)’). [1,0
valores]
13. Criar um total de quatro holofotes (fontes de luz spotlight)
distribuídos ao redor da cenae que devem iluminar parcialmente
estes objectos. Esta iluminação deve ser suficiente para se
conseguir visualizar as naves, mas não necessita de os iluminar na
íntegra. Estas fontes de luz devem poder ser activadas ou
desactivadas através das teclas ’1’ a ‘4’ que ligam e desligam cada
um dos holofotes individualmente. Os holofotes devem ser
geometricamente modelados usando duas primitivas geométricas:
um cone e uma esfera bastando atribuir um tipo de material à
vossa escolha [2 valores]
4. Definir uma câmara fixa com uma vista sobre a cena utilizando
uma projecção perspectiva que mostre toda a cena usando a tecla
‘5’ assim como uma câmara fixa, activada usando a tecla ‘6’, que
está centrada a nave herói utilizando uma projecção ortogonal por
forma a visualizar a ilusão óptica pretendida. [1 valores]

--------------------------------------------------------------------------------------------------------------------------------------------------

# Avaliação IV
A avaliação do quarto trabalho corresponde a 4 valores da nota do laboratório.

# As tarefas do quarto trabalho são as seguintes: 

1. Aplicar ao chão do jogo uma textura e um mapa de alturas (bump
map) para simular o relevo na superfície. Uma textura da imagem
da Mona Lisa deve ser adicionada na parede esquerda e uma textura 
da imagem da pintura Grito (https://pt.wikipedia.org/wiki/O_Grito) 
deve ser adicionado a
parede direita. [1.0 valor]
2. Criar fontes de luzes pontuais. Adicionar as luzes em cada parede
e na parte superior para criar uma luz de cartaz (ver imagens no
fim). Todo suporte e primitivas devem ser cridas para simular a
luz de cartaz. Estas luzes podem estar ligadas ou desligadas (tecla
‘D’ para esquerda e tecla ‘P’ para a direita luz pontual).
Adicionalmente toda a cena deve poder ser desenhada em modelo
de arames (tecla ‘N) e usando ou não o cálculo da iluminação
(tecla ‘M’). [1.0 valor]
3. Deverá criar mensagem no ecrã de inicio do jogo e a opção de
começar o jogo oferecida ao usúario (usando mouse ou teclado).
Deverá permitir-se pausar a visualização quando o utilizador
pressiona a tecla ‘S’ e retomar ao pressionar novamente a tecla.
1Enquanto em pausa, deve ser mostrada uma mensagem no ecrã
que deverá ser sempre legível, independente da posição da
câmara. Quando em pausa, deverá ser possível voltar ao estado
inicial (fazer reset – repor o estado inicial do sistema) sem utilizar
o refresh do navegador, ou seja, premindo uma tecla (tecla ‘R’).
[1.0 valor]
4. Deverá de alguma forma adicionar a alguma lógica no jogo de
maneira que o jogo termine, ou seja, os disparos lançados pela
nave heroi precisam ser capazes de apagar as naves inimigas com
um ou mais hits. No final depois de todas as naves inimigas
destruidas deve aparecer a mensagem de fim de jogo com a opção
de reiniciar o jogo ou sair. [1.0 valor]

