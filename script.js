// ============================================
// CONFIGURACIÓN DE GOOGLE SHEETS
// ============================================
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbwxoWPDGWyULkNSZ0RTTRp-ZsSV8PlYCIQBU2NNrPdhI9Z6EAhmSNAZuJ57DXfdres/exec";

// ============================================
// DETECCIÓN DE NIVEL SEGÚN EL CURSO
// ============================================
function detectarNivelPorCurso(curso) {
    let cursoLower = curso.toLowerCase().trim();
    cursoLower = cursoLower.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Niveles ordenados del más específico al más general
    const nivelesOrdenados = {
        bachillerato: ["1ro ciencias", "1ro tecnico en contabilidad", "1ro tecnico en informatica",
                       "2do ciencias", "2do tecnico en contabilidad", "2do tecnico en informatica",
                       "3ro ciencias", "3ro tecnico en contabilidad", "3ro tecnico en informatica"],
        superior: ["octavo a", "octavo b", "octavo c", "8vo a", "8vo b", "8vo c",
                   "noveno a", "noveno b", "noveno c", "noveno d", "9no a", "9no b", "9no c", "9no d",
                   "decimo a", "decimo b", "decimo c", "decimo d", "10mo a", "10mo b", "10mo c", "10mo d"],
        media: ["5to a", "6to a", "7mo a", "quinto a", "sexto a", "septimo a"],
        elemental: ["segundo", "2do a", "2do b", "3ro a", "3ro b", "4to a", "4to b",
                    "tercero a", "tercero b", "cuarto a", "cuarto b"],
        preparatoria: ["primero a", "primero b", "primero c", "1ro a", "1ro b", "1ro c"],
        inicial: ["inicial 1", "inicial 2a", "inicial 2b"]
    };

    // Recorrer en el orden definido (importante: bachillerato primero)
    for (const [nivel, palabras] of Object.entries(nivelesOrdenados)) {
        for (const palabra of palabras) {
            if (cursoLower.includes(palabra)) {
                return nivel;
            }
        }
    }

    // Si no encontró coincidencia exacta, intentar por números
    const numeros = cursoLower.match(/\d+/);
    if (numeros) {
        const numero = parseInt(numeros[0]);
        // Excluir "ciencias" y "tecnico" del número 1
        if (numero === 1 && !cursoLower.includes("ciencias") && !cursoLower.includes("tecnico")) {
            return "preparatoria";
        }
        if (numero >= 2 && numero <= 4) return "elemental";
        if (numero >= 5 && numero <= 7) return "media";
        if (numero >= 8 && numero <= 10) return "superior";
    }

    return null;
}

// ============================================
// BASE DE PREGUNTAS COMPLETA POR NIVEL
// ============================================

const preguntasPorNivel = {
    inicial: {
        nombre: "Inicial",
        componentes: {
            "🧠 Habilidades": [
                "1) ¿Cómo te llamas?",
                "2) ¿Cuántos años tienes?",
                "3) ¿Cuál es tu comida favorita?",
                "4) ¿Qué crees que pasará si tiras una pelota al aire?",
                "5) ¿Puedes decirme por qué te gusta tu juguete favorito?",
                "6) ¿Qué crees que sucede si todos los días llueve?",
                "7) ¿Qué haces cuando no puedes alcanzar un juguete?",
                "8) ¿Cómo intentarías volver a armar un juguete roto?",
                "9) ¿Qué haces si los lápices para colorear no funcionan?",
                "10) ¿Qué juego quieres jugar ahora?",
                "11) ¿Qué te gustaría comer para el almuerzo/cena?",
                "12) ¿Cuál es tu ropa favorita?",
                "13) ¿Qué más se puede hacer con una caja vacía?",
                "14) ¿Cómo harías una torre muy alta con bloques?",
                "15) ¿Qué haces cuando juegas con tus amigos/as?",
                "16) ¿Compartes tus juguetes con otros niños y niñas? ¿Por qué?",
                "17) ¿Cómo puedes ayudar a tus amigos/as cuando se sienten tristes?",
                "18) ¿Qué haces para jugar con otros niños y niñas?",
                "19) ¿Crees que es importante seguir reglas cuando juegas?",
                "20) ¿Si tus amigos/as no comprenden las reglas, las vuelves a explicar?",
                "21) ¿Cómo te sientes cuando un amigo/a está llorando?",
                "22) ¿Qué harías si ves a alguien que se lastima?",
                "23) ¿Con quién te gusta jugar más?",
                "24) ¿Qué te gusta hacer con tus amigos/as?",
                "25) ¿Te gusta hacer nuevos amigos y amigas?",
                "26) ¿Qué haces cuando estás enojado con un amigo/a?",
                "27) ¿Cómo le dices a alguien lo que quieres?",
                "28) ¿Cómo pides ayuda cuando lo necesitas?",
                "29) Dime algo que conozcas de los niños y niñas de tu barrio.",
                "30) ¿Qué haces cuando estás contento/a?",
                "31) ¿Qué haces cuando te sientes enojado/a?",
                "32) ¿Qué haces para relajarte cuando estás cansado/a?",
                "33) ¿Qué te gusta hacer cuando necesitas descansar?"
            ],
            "🏠 Entorno": [
                "34) ¿Con quién vives en casa?",
                "35) ¿Qué te gusta hacer con tu familia?",
                "36) ¿Con quién juegas en la escuela?",
                "37) ¿Qué te gusta hacer en el patio de recreo?"
            ],
            "😊 Estado Emocional": [
                "38) ¿Cómo te sientes hoy?",
                "39) ¿Hay algo que quieras contar sobre tu día?",
                "40) ¿Te gustaría quedarte con tus compañeros y profesores?"
            ]
        }
    },
    preparatoria: {
        nombre: "Preparatoria",
        componentes: {
            "🧠 Habilidades": [
                "1) ¿Cómo te llamas?",
                "2) ¿Cuántos años tienes?",
                "3) ¿Cuál es tu comida favorita?",
                "4) ¿Qué crees que pasará si tiras una pelota al aire?",
                "5) ¿Puedes decirme por qué te gusta tu juguete favorito?",
                "6) ¿Qué crees que sucede si todos los días llueve?",
                "7) ¿Qué haces cuando no puedes alcanzar un juguete?",
                "8) ¿Cómo intentarías volver a armar un juguete roto?",
                "9) ¿Qué haces si los lápices para colorear no funcionan?",
                "10) ¿Qué juego quieres jugar ahora? ¿Por qué?",
                "11) ¿Qué comida prefieres para desayunar?",
                "12) ¿Cuál es tu ropa favorita cuando hace frío?",
                "13) ¿Qué otro uso le darías a una caja vacía?",
                "14) ¿Qué figura podrías armar con bloques/rosetas?",
                "15) ¿Qué harías con una hoja de papel en blanco?",
                "16) ¿Te gusta jugar con tus amigos/as? ¿Por qué?",
                "17) ¿Respetas tu turno al jugar con tus amigos y amigas?",
                "18) ¿Sabes que hay personas que necesitan ayuda?",
                "19) ¿Qué haces si un compañero no trajo nada para comer en el recreo?",
                "20) ¿Por qué es importante compartir con los demás?",
                "21) ¿Crees que es importante seguir las reglas del juego?",
                "22) ¿Si tus amigos no comprenden las reglas, las vuelves a explicar?",
                "23) ¿Cómo te sientes cuando un amigo/a está llorando?",
                "24) ¿Qué harías si ves a alguien necesita ayuda para llevar sus útiles escolares?",
                "25) ¿Con quién te gusta jugar más?",
                "26) ¿Qué te gusta hacer con tus amigos/as?",
                "27) ¿Te gusta hacer nuevos amigos?",
                "28) ¿Qué haces cuando estás enojado con un amigo/a?",
                "29) ¿Qué haces para reconciliarte con un amigo/a?",
                "30) ¿Cómo le dices a alguien lo que quieres?",
                "31) ¿Cómo pides ayuda cuando lo necesitas?",
                "32) Cuando pides prestado un juguete ¿cómo lo haces?",
                "33) ¿Sabes que hay niños/as en otros países? Puedes decirme algo que conozcas de las niñas y niños de otros países?",
                "34) ¿Te gusta la ropa que utilizan niños y niñas de otras culturas?",
                "35) ¿Cómo te sientes cuando estás contento/a?",
                "36) ¿Qué haces cuando te sientes enojado/a?",
                "37) ¿Qué haces para relajarte cuando estás cansado/a?",
                "38) ¿Qué te gusta hacer cuando necesitas descansar?"
            ],
            "🏠 Entorno": [
                "39) ¿Con qué familiar te gusta pasar más tiempo?",
                "40) ¿En qué actividades compartes tiempo con tu familia?",
                "41) ¿Quiénes son tus amigos?",
                "42) En la escuela, ¿te agrada que te ayuden con las actividades escolares?"
            ],
            "😊 Estado Emocional": [
                "43) ¿Cómo te sientes hoy? ¿Por qué?",
                "44) ¿Hay algo que quieras contar sobre tu día (esta mañana, esta tarde)?"
            ]
        }
    },
    elemental: {
        nombre: "Básica Elemental",
        componentes: {
            "🧠 Habilidades": [
                "1) ¿Cómo te sientes contigo mismo/a?",
                "2) ¿Qué cosas te hacen feliz?",
                "3) ¿Cuáles son tus habilidades favoritas?",
                "4) ¿Qué crees que sucederá si sueltas un globo de los que se utilizan para las fiesta?",
                "5) ¿Es posible que una persona sin protección salga al espacio?",
                "6) ¿Qué crees que pasaría si todos los días llueve?",
                "7) ¿Qué haces cuando pierdes un objeto que usas frecuentemente?",
                "8) ¿Cómo armas un rompecabezas que sabes que le falta una pieza?",
                "9) ¿Qué haces si te levantaste tarde para ir a la escuela?",
                "10) ¿Cómo eliges qué juego jugar?",
                "11) ¿Qué consideras para elegir tu ropa?",
                "12) ¿Qué consideras para elegir descansar?",
                "13) ¿Qué puedes hacer con una hoja de papel en blanco?",
                "14) ¿Cómo inventarías un nuevo cuento?",
                "15) ¿Podrías crear reglas para algún juego?",
                "16) ¿Cómo compartes tus juguetes con tus amigos/as?",
                "17) ¿Respetas las reglas en un juego?",
                "18) ¿Sabes qué es lo que hacen las personas para ayudar a los demás?",
                "19) ¿Por qué es importante cuidar el medio ambiente?",
                "20) ¿Por qué piensas que es importante cuidar a los animales?",
                "21) ¿Por qué es importante ser honesto/a?",
                "22) ¿Por qué es importante ser justo/a?",
                "23) ¿Por qué es importante ser respetuoso/a?",
                "24) ¿Cómo te sientes cuando un amigo está triste?",
                "25) ¿Qué harías para consolar a alguien que está llorando?",
                "26) ¿Cómo te llevas con tus compañeros/as de clase?",
                "27) ¿Cómo haces nuevos amigos/as?",
                "28) ¿Qué haces cuando tienes una discusión con alguien?",
                "29) ¿Cómo intentas resolver un conflicto con tus amigos/as?",
                "30) ¿Cómo le explicas tus ideas a otras personas?",
                "31) ¿Cómo pides ayuda cuando la necesitas?",
                "32) ¿Sabes cómo se llaman otros países?",
                "33) ¿Qué crees que es importante conocer sobre diferentes culturas?",
                "34) ¿Qué haces cuando te enojas?",
                "35) ¿Qué haces cuando te sientes triste?",
                "36) ¿Qué haces cuando te sientes abrumado/a?",
                "37) ¿Cuáles son tus técnicas para relajarte?"
            ],
            "🏠 Entorno": [
                "38) ¿Qué actividades te gusta realizar con las personas con las que vives?",
                "39) ¿Cómo te sientes cuando estás en casa?",
                "40) ¿Con qué compañero te gusta salir al recreo? ¿Por qué?",
                "41) ¿Qué es lo que más te gusta de venir a la escuela?"
            ],
            "😊 Estado Emocional": [
                "42) ¿Cómo te sientes hoy?",
                "43) ¿Hay algo que te genere vergüenza o culpa en este momento?"
            ]
        }
    },
    media: {
        nombre: "Básica Media",
        componentes: {
            "🧠 Habilidades": [
                "1) Si tuvieras algo lindo que decirte, ¿qué te dirías?",
                "2) ¿Qué te gusta hacer?",
                "3) ¿Cuáles crees que son tus defectos?",
                "4) ¿Es posible que una persona pueda sumergirse a grandes profundidades del mar? ¿Por qué?",
                "5) ¿Por qué crees que debes utilizar protección para protegerte del sol?",
                "6) ¿Conoces algún superhéroe o superheroína?, ¿cuál es su poder? ¿Es posible el poder que tiene?",
                "7) ¿Qué haces cuando tienes una tarea pendiente que olvidaste hacerla?",
                "8) ¿Qué haces cuando al leer un texto, la información es confusa?",
                "9) Si rompes un objeto de vidrio, ¿qué es lo primero que haces?",
                "10) ¿Si te sientes agripado y te invitan a jugar al aire libre, ¿qué haces?",
                "11) ¿Cómo asumes tu responsabilidad cuando has tomado una decisión que no fue la mejor?",
                "12) Si vas a dibujar el fondo del mar ¿cuáles son los principales colores que utilizarías? ¿qué elemento dibujarías?",
                "13) Además de colorear, ¿qué más se puede hacer con un lápiz de color?",
                "14) ¿Qué haces para participar y aportar activamente en un trabajo o proyecto de equipo?",
                "15) ¿Cuál es logro más destacado que recuerdas de alguna actividad que realizaste en un equipo? ¿Por qué?",
                "16) ¿Qué haces cuando las ideas para una tarea que da otra persona, no son iguales a tus ideas?",
                "17) ¿Qué actividades harías para un estudiante que viene de otro lugar, se sienta parte del grupo?",
                "18) ¿Qué es la injusticia para ti?",
                "19) Cuando alguien que conoces juzga a una persona, ¿qué haces?",
                "20) Si tu mejor amigo, te cuenta un problema que le ha afectado mucho, ¿qué haces para ayudarle?",
                "21) ¿Qué haces cuando ves llorando a alguien que conoces?",
                "22) ¿Cómo te aseguras de escuchar las opiniones de tus compañeros y compañeras?",
                "23) ¿Cuál es tu rol preferido cuando participas en una actividad en equipo? ¿Qué te gusta hacer y por qué?",
                "24) ¿Elogias los logros de tus compañeros y compañeras? ¿Por qué?",
                "25) ¿Cómo te sientes cuando alguien a quien aprecias está enojado contigo?",
                "26) ¿Qué es para ti un desacuerdo entre dos o más personas?",
                "27) ¿Qué haces en una situación en la que dos amigos o amigas están en un conflicto? (están peleando)",
                "28) ¿Qué haces para asegurarte que te estás comunicando claramente con otras personas?",
                "29) Cuando te piden que hagas una tarea determinada, ¿cómo te aseguras de que tienes claridad de lo que debes hacer?",
                "30) ¿Qué haces cuando quieres comunicar una idea diferente a la que tus amigos y amigas piensan?",
                "31) ¿Qué haces para ayudar a que la contaminación disminuya?",
                "32) ¿Crees que es importante aprender sobre las personas que viven en otros países? ¿Por qué?",
                "33) ¿Cómo describirías un mundo más justo?",
                "34) ¿Qué te hace sentir muy triste y qué muy feliz?",
                "35) ¿Qué haces cuando el tiempo que te dieron para hacer una tarea se agota y tú no terminas la tarea?",
                "36) ¿Qué haces para relajarte si te sientes cansado?"
            ],
            "🏠 Entorno": [
                "37) En casa, ¿con quién tienes mejor relación y con quién no?",
                "38) ¿Qué situaciones te generan malestar en casa?",
                "39) ¿Qué aspectos te gustan más de tu escuela? ¿cuáles los cambiarías?",
                "40) ¿Cómo es el trato entre compañeros y compañeras de tu escuela?"
            ],
            "😊 Estado Emocional": [
                "41) ¿Cómo te sientes en este momento?",
                "42) Generalmente, ¿cuál es la emoción más frecuente en ti? ¿Por qué crees que te sientes así?"
            ]
        }
    },
    bachillerato: {
        nombre: "Bachillerato",
        componentes: {
            "🧠 Habilidades": [
                "1) ¿Qué características propias te hacen único/a?",
                "2) ¿Qué características propias crees que podrías mejorar?",
                "3) ¿Qué cualidades propias te ayudarían a cumplir tus metas?",
                "4) Cuando te encuentras ante un problema de difícil solución, ¿qué sueles hacer en primer lugar?",
                "5) ¿Cómo evaluas la información antes de formar una opinión?",
                "6) ¿Cómo abordas los desafíos que enfrentas en tu vida diaria?",
                "7) ¿Cuáles son algunas estrategias que utilizas para resolver problemas?",
                "8) ¿A quién o quiénes acudes para que te apoyen en la resolución de desafíos?",
                "9) ¿Qué factores consideras antes de tomar una decisión importante?",
                "10) ¿Cuáles son tus proyectos o metas a futuro?",
                "11) ¿Hay algo que podría resultar una barrera o dificultad para cumplir lo que te propones?",
                "12) ¿Qué estrategias utilizarías si tuvieras que realizar un proyecto y no cuentas con todos los materiales requeridos?",
                "13) ¿Cómo harías para que algo que en un inicio pareciera no ser muy útil, se convierta en algo de valor?",
                "14) ¿Cómo trabajas en equipo para resolver desafíos de manera colaborativa?",
                "15) ¿Cuál es tu compromiso con el bienestar de la sociedad?",
                "16) ¿Qué acciones has realizado para contribuir a mejorar tu comunidad?",
                "17) ¿Cuáles son tus principios éticos fundamentales?",
                "18) ¿Cómo promueves la justicia y la equidad en tu entorno?",
                "19) ¿Qué actitud tomas para establecer comunicación con personas cuya forma de pensar es muy distinta a la tuya?",
                "20) ¿Qué harías si ves a un grupo de personas que excluyen a alguien de su grupo?",
                "21) ¿Cómo crees que se pueden establecer relaciones positivas dentro de un grupo diverso de personas?",
                "22) ¿Cómo crees que se podría fortalecer la participación de todos dentro de un trabajo en equipo?",
                "23) ¿Cuál es la mejor manera de llegar a acuerdos frente a una situación que genera malestar entre dos o más personas?",
                "24) ¿Qué haces para restablecer la comunicación luego de ocurrido un conflicto entre dos o más personas?",
                "25) ¿Cómo te aseguras de comunicar tus ideas y opiniones de manera clara y respetuosa?",
                "26) ¿Qué estrategia utilizarías para motivar a otras personas a hacer algo que les pides?",
                "27) ¿Qué podrías hacer para eliminar posibles barreras en la comunicación con tu familia y amigos?",
                "28) ¿Cuál consideras que es tu aporte en la resolución de situaciones de preocupación mundial como el calentamiento global o la contaminación ambiental?",
                "29) ¿Cómo aportarías en la prevención de problemáticas del mundo actual?",
                "30) ¿Qué consideras que se debe hacer cuando una persona no se siente bien emocionalmente?",
                "31) ¿Qué estrategias utilizas para manejar tus emociones?",
                "32) ¿Qué situaciones te causan estrés y qué haces para evitarlo?",
                "33) ¿Qué haces para disminuir el nivel de estrés y sentirte mejor frente a una situación compleja?"
            ],
            "🏠 Entorno": [
                "34) ¿Cómo influye tu entorno familiar en tu desarrollo personal?",
                "35) ¿Cuáles son los valores que definen a tu familia?",
                "36) ¿En qué situaciones te sientes presionado por tus compañeros y compañeras de clase?",
                "37) ¿Qué situaciones consideras que son riesgosas en la institución educativa y por qué?"
            ],
            "😊 Estado Emocional": [
                "38) ¿Cómo te sientes en general en este momento de tu vida?",
                "39) ¿Hay algo en particular en este momento que te preocupe o te haga feliz?"
            ]
        }
    },

    superior: {
        nombre: "Básica Superior",
        componentes: {
            "🧠 Habilidades": [
                "1) ¿Quién eres? ¿Cómo te definirías en 3 palabras?",
                "2) ¿Cuáles son tus características, Cualidades y defectos?",
                "3) ¿Cómo te ves en 5 años? ¿Qué te gustaría estar haciendo?",
                "4) ¿Qué harías para determinar una fuente confiable y diferenciar entre información falsa y verdadera?",
                "5) Cuando te enfrentas a problemas complejos, ¿qué haces para resolverlos?",
                "6) ¿Cómo diferencias un problema simple de uno complejo?",
                "7) ¿De qué manera planteas soluciones a problemas cotidianos?",
                "8) ¿Cómo sabes que la solución dada a un problema complejo dio resultados?",
                "9) ¿Cuál sería tu reacción si un compañero o compañera te está presionando a hacer algo que consideras incorrecto?",
                "10) Cuando debes tomar una decisión importante ¿cómo valoras los pros y los contras antes de elegir?",
                "11) ¿Cómo te sientes cuando encuentras una solución nueva y creativa a un problema? ¿Por qué?",
                "12) ¿Qué haces para estimular tu imaginación y creatividad en tus tiempos libres?",
                "13) ¿Qué haces para participar y aportar activamente en un trabajo o proyecto de equipo?",
                "14) ¿Cómo reaccionas cuando una o más personas con las que realizas trabajo en equipo, tienen ideas distintas?",
                "15) ¿Qué temas sociales del Ecuador te preocupan más y por qué?",
                "16) ¿Qué actitud tienes ante la diversidad de creencias y costumbres, distintas a las tuyas?",
                "17) ¿Qué harías si te encontraras algo que no te pertenece y tienes la posibilidad de ubicar a su dueño o dueña?",
                "18) ¿Qué actitud tomarías si observaras o sospecharas que otra persona esté realizando algún acto que pudiera afectar a alguien?",
                "19) ¿Cómo te relacionas con personas que son de otros países y que tienen costumbres y lenguaje distinto?",
                "20) ¿Qué haces para entender otras culturas y costumbres?",
                "21) ¿Qué haces para ayudar a otras personas cuando enfrentan una situación difícil?",
                "22) ¿Qué cualidades tuyas te permiten mantener una buena relación y comunicación con otras personas?",
                "23) ¿Qué estrategias utilizas para comunicarte adecuadamente con otras personas cuyas ideas u opiniones son distintas a las tuyas?",
                "24) ¿Cuál crees que pueda ser la mejor manera de resolver un conflicto en el que están involucradas varias personas con opiniones diferentes?",
                "25) ¿Cuál crees que debería ser la actitud y posición de quien representa al grado cuando existen opiniones diferentes?",
                "26) ¿Cuál suele ser tu reacción cuando el comportamiento de una persona te genera malestar?",
                "27) ¿Qué sueles hacer para asegurarte de que te estás comunicando con otras personas de forma respetuosa y clara?",
                "28) ¿Te interesa ver programas o documentales culturales de diferentes regiones y países?",
                "29) ¿Qué características pueden diferenciar a personas entre un país y otro?",
                "30) ¿Qué aspectos pueden conectar a personas de diferentes culturas y creencias?",
                "31) ¿Consideras que la forma en que una persona expresa sus emociones puede llegar afectar a otras personas? ¿Por qué?",
                "32) ¿Qué estrategias utilizas para manejar emociones como la tristeza o ansiedad?",
                "33) ¿Qué haces para relajarte cuando enfrentas alguna situación complicada?",
                "34) ¿Cómo organizas tu tiempo para cumplir con las tareas que te propones hacer en un día?"
            ],
            "🏠 Entorno": [
                "35) Cuando has tomado una decisión que no fue la mejor ¿Cómo te apoya tu familia?",
                "36) ¿Cómo influye tu familia en tu comportamiento?",
                "37) Si tuvieras que cambiar algo de tu institución educativa, ¿qué cambiarías?",
                "38) ¿Tus mejores amigos o amigas están en tu institución educativa?"
            ],
            "😊 Estado Emocional": [
                "39) ¿Cómo te sientes en general en tu vida diaria?",
                "40) ¿Cómo te sientes en este momento? ¿Por qué te sientes así?"
            ]
        }
    }
};

// ============================================
// VARIABLES GLOBALES
// ============================================
let nivelActual = "";
const contenedorPreguntas = document.getElementById("formularioPreguntas");
const nombreEstudiante = document.getElementById("nombreEstudiante");
const fechaEvaluacion = document.getElementById("fechaEvaluacion");
const cursoInputElem = document.getElementById("curso");
const docenteInputElem = document.getElementById("docente");
const mensajeDiv = document.getElementById("mensajeInfo");
const formularioDatos = document.getElementById("formularioDatos");
const seccionPreguntas = document.getElementById("seccionPreguntas");
const cursoMostrado = document.getElementById("cursoMostrado");
const nivelAsignado = document.getElementById("nivelAsignado");

// ============================================
// FUNCIONES AUXILIARES
// ============================================
function mostrarMensaje(texto, esError = false) {
    mensajeDiv.style.display = "block";
    mensajeDiv.textContent = texto;
    mensajeDiv.style.background = esError ? "#ffe0e0" : "#dff1e6";
    mensajeDiv.style.color = esError ? "#a12222" : "#1565C0";
    setTimeout(() => {
        mensajeDiv.style.display = "none";
    }, 5000);
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function (m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ============================================
// VALIDACIONES DE PREGUNTAS OBLIGATORIAS
// ============================================
function resaltarPreguntasVacias() {
    const items = document.querySelectorAll(".pregunta-item");
    let hayVacias = false;
    items.forEach(item => {
        const respuesta = item.querySelector(".respuesta-input")?.value.trim() || "";
        if (respuesta === "") {
            item.style.borderLeft = "5px solid #e74c3c";
            item.style.backgroundColor = "#fff5f5";
            hayVacias = true;
        } else {
            item.style.borderLeft = "5px solid #1565C0";
            item.style.backgroundColor = "#fefefe";
        }
    });
    return hayVacias;
}

function validarRespuestasCompletas() {
    const hayVacias = resaltarPreguntasVacias();
    if (hayVacias) {
        const totalPreguntas = document.querySelectorAll(".pregunta-item").length;
        const respondidas = document.querySelectorAll('.pregunta-item[style*="border-left: 5px solid #C62828"]').length;
        const vacias = totalPreguntas - respondidas;
        mostrarMensaje(`❌ Faltan responder ${vacias} pregunta(s). Las preguntas sin responder están marcadas en rojo.`, true);
        const primerElementoVacio = document.querySelector('.pregunta-item[style*="border-left: 5px solid #e74c3c"]');
        if (primerElementoVacio) {
            primerElementoVacio.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return false;
    }
    return true;
}

function inicializarValidacionEnTiempoReal() {
    document.addEventListener('input', function (e) {
        if (e.target.classList.contains('respuesta-input')) {
            const preguntaItem = e.target.closest('.pregunta-item');
            if (preguntaItem) {
                const respuesta = e.target.value.trim();
                if (respuesta !== "") {
                    preguntaItem.style.borderLeft = "5px solid #1565C0";
                    preguntaItem.style.backgroundColor = "#fefefe";
                } else {
                    preguntaItem.style.borderLeft = "5px solid #e74c3c";
                    preguntaItem.style.backgroundColor = "#fff5f5";
                }
            }
        }
    });
}

// ============================================
// CARGAR FORMULARIO DE PREGUNTAS POR NIVEL
// ============================================
function cargarFormularioPorNivel(nivel) {
    const data = preguntasPorNivel[nivel];
    if (!data) return;

    let html = "";
    for (const [componente, preguntas] of Object.entries(data.componentes)) {
        html += `<div class="seccion"><h2>${componente}</h2>`;
        preguntas.forEach((pregunta, idx) => {
            const idUnico = `${nivel}_${componente.replace(/\s/g, '')}_${idx}`;
            html += `
                <div class="pregunta-item">
                    <div class="pregunta-texto">${escapeHtml(pregunta)}</div>
                    <textarea class="respuesta-input" data-pregunta-id="${idUnico}" rows="2" placeholder="Escriba aquí su respuesta..."></textarea>
                </div>
            `;
        });
        html += `</div>`;
    }
    contenedorPreguntas.innerHTML = html;
    inicializarValidacionEnTiempoReal();
}

// ============================================
// INICIAR EVALUACIÓN (VALIDAR DATOS)
// ============================================
function iniciarEvaluacion() {
    const nombre = nombreEstudiante.value.trim();
    const curso = cursoInputElem.value.trim();
    const tutor = docenteInputElem.value.trim();

    if (!nombre) {
        mostrarMensaje("❌ Por favor ingrese el nombre completo del estudiante", true);
        nombreEstudiante.focus();
        return;
    }
    if (nombre.length < 3) {
        mostrarMensaje("❌ El nombre debe tener al menos 3 caracteres", true);
        nombreEstudiante.focus();
        return;
    }
    if (!curso) {
        mostrarMensaje("❌ Por favor ingrese el curso/grado", true);
        cursoInputElem.focus();
        return;
    }
    if (!tutor) {
        mostrarMensaje("❌ Por favor ingrese el nombre del tutor/a", true);
        docenteInputElem.focus();
        return;
    }

    const nivelDetectado = detectarNivelPorCurso(curso);

    if (!nivelDetectado) {
        mostrarMensaje("⚠️ No se pudo detectar automáticamente el nivel. Por favor, revise el formato del curso (ej: 4to EGB, Inicial, Bachillerato)", true);
        return;
    }

    nivelActual = nivelDetectado;
    cursoMostrado.textContent = curso;
    nivelAsignado.textContent = preguntasPorNivel[nivelActual].nombre;

    formularioDatos.style.display = "none";
    seccionPreguntas.style.display = "block";

    cargarFormularioPorNivel(nivelActual);

    if (!fechaEvaluacion.value) {
        fechaEvaluacion.value = new Date().toISOString().slice(0, 10);
    }

    mostrarMensaje(`✅ Nivel detectado: ${preguntasPorNivel[nivelActual].nombre}. Complete todas las preguntas.`);
}

// ============================================
// GUARDAR EN GOOGLE SHEETS - CORREGIDO
// ============================================
async function guardarEnGoogleSheets() {
    const respuestasArray = [];
    const secciones = document.querySelectorAll(".seccion");

    secciones.forEach(seccion => {
        const componente = seccion.querySelector("h2")?.innerText || "Sin componente";
        const preguntasItems = seccion.querySelectorAll(".pregunta-item");
        preguntasItems.forEach((item) => {
            const pregunta = item.querySelector(".pregunta-texto")?.innerText || "Pregunta";
            const respuesta = item.querySelector(".respuesta-input")?.value || "";
            respuestasArray.push({
                componente: componente,
                pregunta: pregunta,
                respuesta: respuesta
            });
        });
    });

    const datos = {
        estudiante: nombreEstudiante?.value || "Sin nombre",
        curso: cursoInputElem?.value || "Sin curso",
        docente: docenteInputElem?.value || "Sin tutor",
        nivel: preguntasPorNivel[nivelActual]?.nombre || nivelActual || "No detectado",
        fechaEvaluacion: new Date().toISOString().slice(0, 10),
        totalPreguntas: respuestasArray.length,
        respuestas: respuestasArray,
        timestamp: new Date().toISOString()
    };

    console.log("📤 Enviando datos:", datos);

    try {
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        console.log("✅ Datos enviados a Google Sheets");
        return true;

    } catch (error) {
        console.error("❌ Error en Google Sheets:", error);
        mostrarMensaje("❌ Error al guardar: " + error.message, true);
        return false;
    }
}
// ============================================
// ENVIAR EVALUACIÓN (SOLO GUARDAR EN GOOGLE SHEETS)
// ============================================
async function enviarEvaluacion() {
    if (!validarRespuestasCompletas()) return;

    const boton = document.getElementById("enviarTodoBtn");
    const textoOriginal = boton.innerText;

    try {
        boton.innerHTML = "Enviando... <span class='loading'></span>";
        boton.disabled = true;

        const resultado = await guardarEnGoogleSheets();

        if (resultado) {
            mostrarMensaje("✅ ¡Evaluación enviada exitosamente!");

            // Limpiar formulario después de guardar
            document.querySelectorAll(".respuesta-input").forEach(inp => inp.value = "");
            formularioDatos.style.display = "block";
            seccionPreguntas.style.display = "none";
            nombreEstudiante.value = "";
            cursoInputElem.value = "";
            docenteInputElem.value = "";
            fechaEvaluacion.value = new Date().toISOString().slice(0, 10);
            nivelActual = "";
        } else {
            mostrarMensaje("❌ Error al guardar en Google Sheets. Verifica tu conexión.", true);
        }

    } catch (error) {
        console.error("Error:", error);
        mostrarMensaje("❌ Error al guardar la evaluación. Verifique su conexión a internet.", true);
    } finally {
        boton.innerHTML = textoOriginal;
        boton.disabled = false;
    }
}

// ============================================
// FUNCIÓN PARA REGRESAR AL FORMULARIO DE DATOS
// ============================================
function regresarADatos() {
    const confirmar = confirm("¿Estás seguro de que quieres regresar? Las respuestas que has escrito se perderán.");
    if (!confirmar) return;

    document.querySelectorAll(".respuesta-input").forEach(inp => inp.value = "");

    seccionPreguntas.style.display = "none";
    formularioDatos.style.display = "block";
    fechaEvaluacion.value = new Date().toISOString().slice(0, 10);
    nivelActual = "";

    mostrarMensaje("🔙 Has regresado al formulario de datos. Puedes modificar tu información y volver a comenzar.");
}

// ============================================
// EVENTOS E INICIALIZACIÓN
// ============================================
document.addEventListener("DOMContentLoaded", function () {
    const btnIniciar = document.getElementById("iniciarEvaluacionBtn");
    const btnEnviar = document.getElementById("enviarTodoBtn");
    const btnRegresar = document.getElementById("regresarBtn");

    if (btnIniciar) btnIniciar.addEventListener("click", iniciarEvaluacion);
    if (btnEnviar) btnEnviar.addEventListener("click", enviarEvaluacion);
    if (btnRegresar) btnRegresar.addEventListener("click", regresarADatos);

    fechaEvaluacion.value = new Date().toISOString().slice(0, 10);

    console.log("✅ Aplicación cargada correctamente - Solo Google Sheets");
    console.log("📚 Niveles disponibles:", Object.keys(preguntasPorNivel).join(", "));
});
