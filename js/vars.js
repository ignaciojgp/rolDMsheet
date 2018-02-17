var principales = [

    {nombre:"Iniciativa",                  tipo:3, id:"Ini"},

    {nombre:"",                            tipo:2, id:"-"},

    // {nombre:"Nivel",                       tipo:3, id:"Nivel"},
    {nombre:"DG",                          tipo:3, id:"DG"},
    {nombre:"PG",                          tipo:3, id:"PG"},

    {nombre:"",                            tipo:2, id:"-"},

    {nombre:"Daño",                        tipo:6, id:"Daño"},
    {nombre:"Atenuado",                    tipo:6, id:"Atenuado"},

    {nombre:"",                            tipo:2, id:"-"},

    {nombre:"CA",                          tipo:3, id:"CA"},
    {nombre:"CA toque",                    tipo:3, id:"CAToque"},
    {nombre:"CA desp",                     tipo:3, id:"CADesprevenido"},
    {nombre:"Presa",                       tipo:2, id:"Presa"},

];

var ataques = [
    {nombre:"Ataque 1",                     tipo:3, id:"a1"},
    {nombre:"Daño 1",                       tipo:2, id:"d1"},
    {nombre:"Ataque 2",                     tipo:3, id:"a2"},
    {nombre:"Daño 2",                       tipo:2, id:"d2"},
    {nombre:"Ataque 3",                     tipo:3, id:"a3"},
    {nombre:"Daño 3",                       tipo:2, id:"d3"},

];

var salvacion = [
    {nombre:"Fortaleza",                    tipo:3, id:"tsf",   charId:"con"      },
    {nombre:"Reflejos",                     tipo:3, id:"tsr",   charId:"des"      },
    {nombre:"Voluntad",                     tipo:3, id:"tsv",   charId:"sab"      }

];

var caracteristicas = [
    {nombre:"Fuerza", tipo:1, id:"frz"},
    {nombre:"Destreza", tipo:1, id:"des"},
    {nombre:"Constitución", tipo:1, id:"con"},
    {nombre:"Inteligencia", tipo:1, id:"int"},
    {nombre:"Sabiduría", tipo:1, id:"sab"},
    {nombre:"Carisma", tipo:1, id:"car"},

];

var armadura = [
    {nombre:"CA", tipo:1, id:"CAbase"},
    {nombre:"CA esquiva", tipo:1, id:"CAesquiva"},
    {nombre:"CA a. natural", tipo:1, id:"CAnat"},
    {nombre:"CA magia", tipo:1, id:"CAmagia"}
];

var miscelaneos = [
    {nombre:"Iniciativa", tipo:1, id:"iniciativa"},
    {nombre:"Resistencia a conjuros", tipo:1, id:"resitanciaMag"}
];

var habilidades =  [


    {nombre:"Abrir Cerraduras",            tipo:2, id:"hab_cerraduras",      charId:"des" },
    {nombre:"Alquimia",                    tipo:2, id:"hab_alquimia",         charId:"int" },
    {nombre:"Averiguar Intenciones",       tipo:2, id:"hab_intenciones",     charId:"sab" },
    {nombre:"Avistar",                     tipo:2, id:"hab_avistar",          charId:"sab" },
    {nombre:"Buscar",                      tipo:2, id:"hab_buscar",           charId:"int" },
    {nombre:"Concentración",               tipo:2, id:"hab_concentración",    charId:"con" },
    {nombre:"Con de Conjuros",             tipo:2, id:"hab_conjuros",        charId:"int" },
    {nombre:"Curar",                       tipo:2, id:"hab_curar",            charId:"sab" },
    {nombre:"Descifrar Escritura",         tipo:2, id:"hab_escritura",       charId:"int" },
    {nombre:"Diplomacia",                  tipo:2, id:"hab_diplomacia",       charId:"car" },
    {nombre:"Disfrazarse",                 tipo:2, id:"hab_disfrazarse",      charId:"car" },
    {nombre:"Engañar",                     tipo:2, id:"hab_engañar",          charId:"car" },
    {nombre:"Equilibrio",                  tipo:2, id:"hab_equilibrio",       charId:"des" },
    {nombre:"Escapismo",                   tipo:2, id:"hab_escapismo",        charId:"des" },
    {nombre:"Esconderse",                  tipo:2, id:"hab_esconderse",       charId:"des" },
    {nombre:"Escuchar",                    tipo:2, id:"hab_escuchar",         charId:"sab" },
    {nombre:"Escudriñar",                  tipo:2, id:"hab_escudriñar",       charId:"int" },
    {nombre:"Falsificar",                  tipo:2, id:"hab_falsificar",       charId:"int" },
    {nombre:"Germania",                    tipo:2, id:"hab_germania",         charId:"int" },
    {nombre:"Hurtar",                      tipo:2, id:"hab_hurtar",           charId:"des" },
    {nombre:"Intimidar",                   tipo:2, id:"hab_intimidar",        charId:"int" },
    {nombre:"Inutilizar Mecanismo",        tipo:2, id:"hab_mecanismo",        charId:"int" },
    {nombre:"Juego de manos",              tipo:2, id:"hab_manos",            charId:"des" },
    {nombre:"Montar",                      tipo:2, id:"hab_montar",           charId:"des" },
    {nombre:"Moverse sigilosamente",       tipo:2, id:"hab_sigilosamente",    charId:"des" },
    {nombre:"Nadar",                       tipo:2, id:"hab_nadar",            charId:"frz" },
    {nombre:"Piruetas",                    tipo:2, id:"hab_piruetas",         charId:"des" },
    {nombre:"Reunir info",                 tipo:2, id:"hab_info",             charId:"car" },
    {nombre:"Saltar",                      tipo:2, id:"hab_saltar",           charId:"frz" },
    {nombre:"Supervivencia",               tipo:2, id:"hab_supervivencia",    charId:"sab" },
    {nombre:"Tasacion",                    tipo:2, id:"hab_tasacion",         charId:"int" },
    {nombre:"Trato c animales",            tipo:2, id:"hab_animales",         charId:"car" },
    {nombre:"Trepar",                      tipo:2, id:"hab_trepar",           charId:"frz" },
    {nombre:"Usar Objeto Mágico",          tipo:2, id:"hab_mágico",           charId:"car" },
    {nombre:"Uso de cuerda",               tipo:2, id:"hab_cuerda",           charId:"des" },
    {nombre:"Con. arcano",                 tipo:2, id:"hab_arcano",           charId:"int" },
    {nombre:"Con. calabozos",              tipo:2, id:"hab_calabozos",        charId:"int" },
    {nombre:"Con. ingenieria",             tipo:2, id:"hab_ingenieria",       charId:"int" },
    {nombre:"Con. geografia",              tipo:2, id:"hab_geografia",        charId:"int" },
    {nombre:"Con. historia",               tipo:2, id:"hab_historia",         charId:"int" },
    {nombre:"Con. local",                  tipo:2, id:"hab_local",            charId:"int" },
    {nombre:"Con. natualeza",              tipo:2, id:"hab_natualeza",        charId:"int" },
    {nombre:"Con. nobleza",                tipo:2, id:"hab_nobleza",          charId:"int" },
    {nombre:"Con. planos",                 tipo:2, id:"hab_planos",           charId:"int" },
    {nombre:"Con. religion",               tipo:2, id:"hab_religion",         charId:"int" }


];

var ataqueBase = {
    "bueno":    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20 ],
    "regular":  [0,0,1,2,3,3,4,5,6,6,7,8,9,9,10,11,12,12,13,14,15 ],
    "malo":     [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10]
};

var salvacionBase = {
    "buena"   :  [0,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12],
    "malo"    :  [0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6]
};

var niveles = [0,1000,3000,6000,10000,15000,21000,28000,36000,45000,55000,66000,78000,91000,105000,120000,136000,153000,171000,190000,210000,231000,253000,276000,300000,325000,351000,378000,406000,435000];

function getCharMod(puntos){
    return Math.floor((puntos-10)/2);
}
