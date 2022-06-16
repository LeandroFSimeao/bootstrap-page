function salvarNoticia() {
    var elTitulo = document.getElementsByName("titulo")[0];
    var elConteudo = document.getElementsByName("conteudo")[0];
    var elTags = document.getElementsByName("newsTags")[0];
    if (elTitulo.value != "" && elConteudo.value != "") {

        let objNoticias = JSON.parse(localStorage.getItem("noticias"));
        if (objNoticias === null || objNoticias.length == 0)
            objNoticias = new Array();

        let dataAtual = new Date();
        let noticia = new Object;
        noticia.date = dataAtual.toLocaleString();
        noticia.cod = dataAtual.getTime();
        noticia.titulo = elTitulo.value;
        noticia.conteudo = elConteudo.value;
        noticia.tags = elTags.value;
        objNoticias.push(noticia);

        localStorage.setItem("noticias", JSON.stringify(objNoticias));
        elTitulo.value = null, elConteudo.value = null, elTags.value = null;
        document.querySelector("#resultado").innerHTML = "Registro de notícia salvo com sucesso."
    } else {
        console.error("Preencha todos os campos");
    }
}

const checkVal = (arr, val) => {
    let valExist = arr.some(value => value ===val);
    return valExist;
};

function listTags() {
    let objNoticias = JSON.parse(localStorage.getItem("noticias"));
    if (objNoticias === null || objNoticias.length == 0)
        objNoticias = new Array();
    var tagsStr = "";
    for (let noticia of objNoticias) {
        if (noticia.tags != null || noticia.tags !== undefined)
            tagsStr = tagsStr + ";" + noticia.tags;
    }
    let finalArr = new Array();
    if (tagsStr.length > 0) {
        tagsStr = tagsStr.replace("/,/g", ";");
        let arrTags = tagsStr.split(";");

        for (let item of arrTags) {
            if (!checkVal(finalArr, item)) {
                finalArr.push(item);
            }
        }
    }
    let el;
    for (let item of finalArr) {
        el = "<li><a onclick='filterByTag(\""+item.trim()+"\")' href='#'>" + item + "</a></li>";
        $("#tags").append(el);
    }
}
function listarNoticias() {
    
}