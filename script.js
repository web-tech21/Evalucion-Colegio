
// ============================================
// CONFIGURACIÓN DE EMAILJS
// ============================================
// 🔴 IMPORTANTE: Reemplazar con tus credenciales de EmailJS
// 1. Crear cuenta en https://www.emailjs.com/
// 2. Conectar servicio de correo (Gmail, Outlook, etc)
// 3. Crear plantilla con variables: {{to_email}}, {{subject}}, {{message}}
// 4. Obtener Public Key desde Account → API Keys

// ============================================
// CONFIGURACIÓN DE GOOGLE SHEETS
// ============================================
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbwxoWPDGWyULkNSZ0RTTRp-ZsSV8PlYCIQBU2NNrPdhI9Z6EAhmSNAZuJ57DXfdres/exec";

// ============================================
// DETECCIÓN DE NIVEL SEGÚN EL CURSO (VERSIÓN COMPLETA)
// ============================================
function detectarNivelPorCurso(curso) {
    const cursoLower = curso.toLowerCase().trim();

    // INICIAL
    if (cursoLower === "inicial 1" || cursoLower === "inicial 2a" || cursoLower === "inicial 2b") {
        return "inicial";
    }

    // PREPARATORIA
    if (cursoLower === "1ro a" || cursoLower === "1ro b" || cursoLower === "1ro c") {
        return "preparatoria";
    }

    // ELEMENTAL (2do, 3ro, 4to con letras)
    if (cursoLower === "2do a" || cursoLower === "2do b" || cursoLower === "2do c" ||
        cursoLower === "3ro a" || cursoLower === "3ro b" || cursoLower === "3ro c" ||
        cursoLower === "4to a" || cursoLower === "4to b" || cursoLower === "4to c") {
        return "elemental";
    }

    // MEDIA (5to, 6to, 7mo)
    if (cursoLower === "5to a" || cursoLower === "6to a" || cursoLower === "7mo a") {
        return "media";
    }

    // SUPERIOR (8vo, 9no, 10mo con letras)
    if (cursoLower === "octavo a" || cursoLower === "octavo b" || cursoLower === "octavo c" ||
        cursoLower === "noveno a" || cursoLower === "noveno b" || cursoLower === "noveno c" || cursoLower === "noveno d" ||
        cursoLower === "decimo a" || cursoLower === "decimo b" || cursoLower === "decimo c" || cursoLower === "decimo d") {
        return "superior";
    }

    // BACHILLERATO (Ciencias, Contabilidad, Informática)
    if (cursoLower === "1ro ciencias" || cursoLower === "2do ciencias" || cursoLower === "3ro ciencias" ||
        cursoLower === "1ro tecnico en contabilidad" || cursoLower === "2do tecnico en contabilidad" || cursoLower === "3ro tecnico en contabilidad" ||
        cursoLower === "1ro tecnico en informatica" || cursoLower === "2do tecnico en informatica" || cursoLower === "3ro tecnico en informatica") {
        return "bachillerato";
    }

    return null;
}

//================= BASE DE PREGUNTAS COMPLETA POR NIVEL=================


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
        nombre: "Primero de EGB",
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
                "9) ¿Qué haces si los lápices no funcionan?",
                "10) ¿Qué juego quieres jugar ahora? ¿Por qué?",
                "11) ¿Qué comida prefieres para desayunar?",
                "12) ¿Cuál es tu ropa favorita cuando hace frío?",
                "13) ¿Qué otro uso le darías a una caja vacía?",
                "14) ¿Qué figura podrías armar con bloques?",
                "15) ¿Qué harías con una hoja de papel en blanco?",
                "16) ¿Te gusta jugar con tus amigos/as? ¿Por qué?",
                "17) ¿Respetas tu turno al jugar?",
                "18) ¿Sabes que hay personas que necesitan ayuda?",
                "19) ¿Qué haces si un compañero no trajo nada para comer?",
                "20) ¿Por qué es importante compartir?",
                "21) ¿Crees que es importante seguir las reglas del juego?",
                "22) ¿Si tus amigos no comprenden las reglas, las vuelves a explicar?",
                "23) ¿Cómo te sientes cuando un amigo/a está llorando?",
                "24) ¿Qué harías si alguien necesita ayuda con sus útiles?",
                "25) ¿Con quién te gusta jugar más?",
                "26) ¿Qué te gusta hacer con tus amigos/as?",
                "27) ¿Te gusta hacer nuevos amigos?",
                "28) ¿Qué haces cuando estás enojado con un amigo/a?",
                "29) ¿Qué haces para reconciliarte?",
                "30) ¿Cómo le dices a alguien lo que quieres?",
                "31) ¿Cómo pides ayuda?",
                "32) Cuando pides prestado un juguete ¿cómo lo haces?",
                "33) ¿Sabes que hay niños/as en otros países? Cuéntame algo.",
                "34) ¿Te gusta la ropa de otras culturas?",
                "35) ¿Cómo te sientes cuando estás contento/a?",
                "36) ¿Qué haces cuando te sientes enojado/a?",
                "37) ¿Qué haces para relajarte cuando estás cansado/a?",
                "38) ¿Qué te gusta hacer cuando necesitas descansar?"
            ],
            "🏠 Entorno": [
                "39) ¿Con qué familiar te gusta pasar más tiempo?",
                "40) ¿En qué actividades compartes tiempo con tu familia?",
                "41) ¿Quiénes son tus amigos?",
                "42) En la escuela, ¿te agrada que te ayuden con las tareas?"
            ],
            "😊 Estado Emocional": [
                "43) ¿Cómo te sientes hoy? ¿Por qué?",
                "44) ¿Hay algo que quieras contar sobre tu día?"
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
                "4) ¿Qué crees que sucederá si sueltas un globo de fiesta?",
                "5) ¿Es posible que una persona sin protección salga al espacio?",
                "6) ¿Qué pasaría si llueve todos los días?",
                "7) ¿Qué haces cuando pierdes un objeto que usas seguido?",
                "8) ¿Cómo armas un rompecabezas con una pieza faltante?",
                "9) ¿Qué haces si te levantaste tarde para ir a la escuela?",
                "10) ¿Cómo eliges qué juego jugar?",
                "11) ¿Qué consideras para elegir tu ropa?",
                "12) ¿Qué consideras para elegir descansar?",
                "13) ¿Qué puedes hacer con una hoja de papel en blanco?",
                "14) ¿Cómo inventarías un nuevo cuento?",
                "15) ¿Podrías crear reglas para algún juego?",
                "16) ¿Qué haces al trabajar en equipo?",
                "17) ¿Cómo compartes tus juguetes con tus amigos?",
                "18) ¿Respetas las reglas en un juego?",
                "19) ¿Sabes cómo ayudar los demás?",
                "20) ¿Por qué es importante cuidar el medio ambiente?",
                "21) ¿Por qué cuidar a los animales?",
                "22) ¿Por qué ser honesto/a?",
                "23) ¿Por qué ser justos/as?",
                "24) ¿Por qué ser respetuosos?",
                "25) ¿Cómo te sientes cuando un amigo está triste?",
                "26) ¿Qué harías para consolar a alguien que llora?",
                "27) ¿Cómo te llevas con tus compañeros?",
                "28) ¿Cómo haces nuevos amigos?",
                "29) ¿Qué haces si tienes una discusión?",
                "30) ¿Cómo resuelves un conflicto?",
                "31) ¿Cómo explicas tus ideas?",
                "32) ¿Cómo pides ayuda?",
                "33) ¿Sabes nombres de otros países?",
                "34) ¿Qué es importante conocer de otras culturas?",
                "35) ¿Qué haces cuando te enojas?",
                "36) ¿Qué haces cuando estás triste?",
                "37) ¿Qué haces cuando te sientes abrumado?",
                "38) ¿Cuáles son tus técnicas para relajarte?"
            ],
            "🏠 Entorno": [
                "39) ¿Qué actividades te gusta hacer con tu familia?",
                "40) ¿Cómo te sientes en casa?",
                "41) ¿Con qué compañero te gusta salir al recreo? ¿Por qué?",
                "42) ¿Qué es lo que más te gusta de la escuela?"
            ],
            "😊 Estado Emocional": [
                "43) ¿Cómo te sientes hoy?",
                "44) ¿Hay algo que te genere vergüenza o culpa en este momento?"
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
                "4) ¿Puede alguien sumergirse a grandes profundidades? ¿Por qué?",
                "5) ¿Por qué usar protección solar?",
                "6) ¿Conoces algún superhéroe? ¿Su poder es posible?",
                "7) ¿Qué haces si olvidaste una tarea?",
                "8) ¿Qué haces si un texto es confuso?",
                "9) Si rompes vidrio, ¿qué haces primero?",
                "10) Si estás resfriado, ¿vas a jugar afuera?",
                "11) ¿Cómo asumes responsabilidad tras mala decisión?",
                "12) Para dibujar el mar, ¿qué colores usas?",
                "13) ¿Qué más hacer con un lápiz de color?",
                "14) ¿Cómo aportas en trabajo en equipo?",
                "15) Logro destacado en equipo. ¿Por qué?",
                "16) ¿Qué haces si otro tiene ideas diferentes?",
                "17) ¿Cómo integrarías a un estudiante nuevo?",
                "18) ¿Qué es injusticia para ti?",
                "19) Si alguien juzga a otra persona, ¿qué haces?",
                "Analiza consecuencias éticas de decisiones.",
                "Ayuda a tu mejor amigo con problemas.",
                "20) ¿Escuchas opiniones de compañeros?",
                "21) Rol preferido en equipo. ¿Por qué?",
                "22) ¿Elogias logros de otros?",
                "23) ¿Cómo te sientes si alguien cercano se enoja contigo?",
                "24) ¿Qué es un desacuerdo?",
                "25) ¿Qué haces si dos amigos pelean?",
                "26) ¿Cómo comunicarte claramente?",
                "27) ¿Cómo asegurarte de entender una tarea?",
                "28) ¿Cómo proponer idea diferente?",
                "29) ¿Qué haces contra la contaminación?",
                "30) ¿Importa conocer otros países?",
                "31) Describe un mundo justo.",
                "32) ¿Qué te hace muy feliz o muy triste?",
                "33) ¿Qué haces si algo te enoja?",
                "34) ¿Qué haces si se acaba el tiempo y no terminas tarea?",
                "35) ¿Cómo te relajas si estás cansado?"
            ],
            "🏠 Entorno": [
                "36) En casa ¿con quién tienes mejor y peor relación?",
                "37) ¿Qué situaciones te generan malestar en casa?",
                "38) ¿Qué cambiarías de tu escuela?",
                "39) ¿Cómo es el trato entre compañeros?"
            ],
            "😊 Estado Emocional": [
                "40) ¿Cómo te sientes ahora?",
                "41) ¿Cuál es la emoción más frecuente en ti? ¿Por qué?"
            ]
        }
    },

    // ==================== BACHILLERATO ====================
    bachillerato: {
        nombre: "Bachillerato",
        componentes: {
            "🧠 Habilidades": [
                "1) ¿Qué características propias te hacen único/a?",
                "2) ¿Qué características propias crees que podrías mejorar?",
                "3) ¿Qué cualidades propias te ayudarían a cumplir tus metas?",
                "4) Cuando te encuentras ante un problema de difícil solución, ¿qué sueles hacer en primer lugar?",
                "5) ¿Cómo evalúas la información antes de formar una opinión?",
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
                "1) ¿Quién eres? Defínete en 3 palabras.",
                "2) Cualidades y defectos.",
                "3) ¿Cómo te ves en 5 años?",
                "4) ¿Cómo identificar fuente confiable?",
                "5) ¿Cómo resolver problemas complejos?",
                "6) Diferencia entre problema simple y complejo.",
                "7) ¿Cómo planteas soluciones cotidianas?",
                "8) ¿Cómo saber si una solución funcionó?",
                "9) Reacción ante presión a hacer algo incorrecto.",
                "10) ¿Cómo valoras pros y contras en decisión importante?",
                "11) ¿Cómo te sientes al encontrar solución creativa?",
                "12) ¿Qué haces para estimular creatividad?",
                "13) ¿Cómo participar activamente en equipo?",
                "14) Reacción ante ideas distintas en equipo.",
                "15) Temas sociales del Ecuador que te preocupan.",
                "16) Actitud ante diversidad de creencias.",
                "17) Si encuentras algo perdido, ¿qué haces?",
                "18) Actitud si sospechas un acto que afecte a alguien.",
                "19) ¿Cómo te relacionas con personas de otros países?",
                "20) ¿Cómo entender otras culturas?",
                "21) ¿Cómo ayudar a quien enfrenta situación difícil?",
                "22) Cualidades para buena comunicación.",
                "23) Estrategias ante opiniones distintas.",
                "24) Mejor forma de resolver conflicto grupal.",
                "25) Actitud de quien representa al grado.",
                "26) Reacción cuando alguien te genera malestar.",
                "27) ¿Cómo asegurar comunicación respetuosa?",
                "28) ¿Ves documentales culturales?",
                "29) Características que diferencian países.",
                "30) Aspectos que conectan culturas.",
                "31) ¿Cómo afectan las emociones a otros?",
                "32) Estrategias para manejar tristeza o ansiedad.",
                "33) ¿Qué haces para relajarte en situaciones complicadas?",
                "34) ¿Cómo organizas tu tiempo diario?"
            ],
            "🏠 Entorno": [
                "35) ¿Cómo te apoya tu familia tras una mala decisión?",
                "36) ¿Cómo influye tu familia en tu comportamiento?",
                "37) ¿Qué cambiarías de tu institución?",
                "38) ¿Tus mejores amigos están en el colegio?"
            ],
            "😊 Estado Emocional": [
                "39) ¿Cómo te sientes en general en tu vida diaria?",
                "40) ¿Cómo te sientes ahora? ¿Por qué?"
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
        const respondidas = document.querySelectorAll('.pregunta-item[style*="border-left: 5px solid #1565C0"]').length;
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
        return;
    }

    nivelActual = nivelDetectado;
    cursoMostrado.textContent = curso;
    nivelAsignado.textContent = preguntasPorNivel[nivelActual].nombre;

    formularioDatos.style.display = "none";
    seccionPreguntas.style.display = "block";

    cargarFormularioPorNivel(nivelActual);

    mostrarMensaje(`✅ Nivel detectado: ${preguntasPorNivel[nivelActual].nombre}. Complete todas las preguntas.`);
}

// ============================================
// GUARDAR EN GOOGLE SHEETS
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

    try {
        await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });
        console.log("✅ Datos enviados a Google Sheets");
        return true;
    } catch (error) {
        console.error("❌ Error en Google Sheets:", error);
        mostrarMensaje("❌ Error al guardar. Verifica tu conexión.", true);
        return false;
    }
}

// ============================================
// ENVIAR EVALUACIÓN (GUARDAR EN GOOGLE SHEETS)
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

            document.querySelectorAll(".respuesta-input").forEach(inp => inp.value = "");
            formularioDatos.style.display = "block";
            seccionPreguntas.style.display = "none";
            nombreEstudiante.value = "";
            cursoInputElem.value = "";
            docenteInputElem.value = "";
            nivelActual = "";
        } else {
            mostrarMensaje("❌ Error al enviar, Verifica tu conexión.", true);
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

    // Fecha con zona horaria de Ecuador
    function obtenerFechaEcuador() {
        const ahora = new Date();
        const opciones = {
            timeZone: 'America/Guayaquil',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        };
        return ahora.toLocaleDateString('en-CA', opciones);
    }

    if (fechaEvaluacion) {
        fechaEvaluacion.value = obtenerFechaEcuador();
    }

    console.log("✅ Aplicación cargada correctamente - Google Sheets");
    console.log("📚 Niveles disponibles:", Object.keys(preguntasPorNivel).join(", "));
});
