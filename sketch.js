resultArticles = null;
idLengths = null;

//result display function
function dispResults(articles, start, end, idLen, resultsDiv) {
  let articlesDiv = document.createElement("div");
  articlesDiv.setAttribute('id', 'articlesDiv')
  for (let j = start; j < end && j < idLen; j++) {
    var title = articles[j].childNodes[13].innerHTML;
    var link = "https://pubmed.ncbi.nlm.nih.gov/" + articles[j].childNodes[1].innerHTML;
    //AUTHORS LIST
    //CITATION
    //ID AND TYPE
    //SHORT SUMMARY
    // div.innerHTML += `<p><a href="${link}">${title}</a></p>`;
    let contentdiv = document.createElement("div");
    contentdiv.classList.add('docsum-content')
    contentdiv.innerHTML += `<a class="docsum-title" href="${link}">${title}</a>`;
    let wrapdiv = document.createElement("div");
    wrapdiv.classList.add('docsum-wrap');
    wrapdiv.appendChild(contentdiv);
    let temparticle = document.createElement("article");
    temparticle.classList.add("full-docsum");
    temparticle.appendChild(wrapdiv);
    articlesDiv.appendChild(temparticle);
  }
  resultsDiv.appendChild(articlesDiv);
}

function switchPage(pagenum) {
  $('#articlesDiv').remove();
  $('#paginationDiv').remove();
  var resultsDiv = document.getElementById("results");   //result div
  var perPageMenu = document.getElementById("perPageMenu");
  var perpage = perPageMenu.value;
  var idLen = idLengths;
  var articles = resultArticles;
  let start = ((pagenum - 1) * parseInt(perpage));
  let end = start + parseInt(perpage);
  console.log(start, end);
  dispResults(articles, start, end, idLen, resultsDiv);
  displayPagination(pagenum, idLen, perpage);
}

function displayPagination(activeNum, idLen, perpage) {
  var resultsDiv = document.getElementById("results");   //result div
  let paginationDiv = document.createElement("div");
  paginationDiv.setAttribute("id", "paginationDiv");
  paginationDiv.classList.add('pagination');
  resultsDiv.appendChild(paginationDiv);
  paginationDiv.innerHTML += '<button id="paginationButtonLeft" onclick="switchPage(1)">&laquo;</button>';
  for (let pagenum = 1; pagenum <= Math.ceil(idLen / perpage); pagenum++) {
    if (pagenum != activeNum) {
      paginationDiv.innerHTML += `<button id="paginationButton${pagenum}" onclick="switchPage(${pagenum})">${pagenum}</button>`;
    }
    else {
      paginationDiv.innerHTML += `<button id="paginationButton${pagenum}" onclick="switchPage(${pagenum})" class="active">${pagenum}</button>`;
    }
  }
  paginationDiv.innerHTML += `<button id="paginationButtonRight" onclick="switchPage(${Math.ceil(idLen / perpage)})">&raquo;</button>`;
}

//search function
async function search() {
  //base request variables
  var sbase = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
  var sumbase = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
  var basesterm = '(("Acad Emerg Med"[Journal] OR "Am J Med"[Journal] OR "Ann Emerg Med"[Journal] OR "Ann Fam Med"[Journal] OR "Ann Intern Med"[Journal] OR "Ann Med"[Journal] OR "Arch Intern Med"[Journal] OR "BMC Fam Pract"[Journal] OR "BMJ"[Journal] OR "Br J Gen Pract"[Journal] OR "CMAJ"[Journal] OR "Fam Pract"[Journal] OR "J Am Board Fam Med"[Journal] OR "J Clin Epidemiol"[Journal] OR "J Intern Med"[Journal] OR "JAMA"[Journal] OR "Lancet"[Journal] OR "Med Care"[Journal] OR "medicine baltimore"[Journal] OR "N Engl J Med"[Journal] OR "PLoS Med"[Journal] OR "Scand J Prim Health Care"[Journal] OR "JAMA Intern Med"[Journal] OR "Chest"[Journal] OR "Circulation"[Journal] OR "J Am Coll Cardiol"[Journal] OR "Pediatrics"[Journal] OR "Stroke"[Journal] OR "Arch Pediatr Adolesc Med"[Journal] OR "J Gen Intern Med"[Journal]) AND ("validation"[Title/Abstract] OR "validate"[Title/Abstract] OR ("clinical prediction"[All Fields] OR "clinical model*"[All Fields] OR "clinical score*"[All Fields] OR "decision rule*"[All Fields] OR (("diagnosis"[MeSH Terms] OR "diagnosis"[All Fields] OR "diagnostic"[All Fields] OR "diagnostical"[All Fields] OR "diagnostically"[All Fields] OR "diagnostics"[All Fields]) AND ("accuracies"[All Fields] OR "accuracy"[All Fields])) OR "diagnostic rule*"[All Fields] OR "diagnostic score*"[All Fields] OR (("diagnosis"[MeSH Terms] OR "diagnosis"[All Fields] OR "diagnostic"[All Fields] OR "diagnostical"[All Fields] OR "diagnostically"[All Fields] OR "diagnostics"[All Fields]) AND ("value"[All Fields] OR "values"[All Fields])) OR "predictive outcome*"[All Fields] OR "predictive rule*"[All Fields] OR "predictive score*"[All Fields] OR (("predict"[All Fields] OR "predictabilities"[All Fields] OR "predictability"[All Fields] OR "predictable"[All Fields] OR "predictably"[All Fields] OR "predicted"[All Fields] OR "predicting"[All Fields] OR "prediction"[All Fields] OR "predictions"[All Fields] OR "predictive"[All Fields] OR "predictively"[All Fields] OR "predictiveness"[All Fields] OR "predictives"[All Fields] OR "predictivities"[All Fields] OR "predictivity"[All Fields] OR "predicts"[All Fields]) AND ("value"[All Fields] OR "values"[All Fields])) OR "predictive risk*"[All Fields] OR "prediction outcome*"[All Fields] OR "prediction rule*"[All Fields] OR "prediction score*"[All Fields] OR "prediction value*"[All Fields] OR "prediction risk*"[All Fields] OR ("risk assessment"[MeSH Terms] OR ("risk"[All Fields] AND "assessment"[All Fields]) OR "risk assessment"[All Fields]) OR "risk score*"[All Fields] OR "validation decision*"[All Fields] OR "validation rule*"[All Fields] OR "validation score*"[All Fields] OR (("analogs and derivatives"[MeSH Subheading] OR ("analogs"[All Fields] AND "derivatives"[All Fields]) OR "analogs and derivatives"[All Fields] OR "derivatives"[All Fields] OR "derivable"[All Fields] OR "derivant"[All Fields] OR "derivants"[All Fields] OR "derivate"[All Fields] OR "derivated"[All Fields] OR "derivates"[All Fields] OR "derivation"[All Fields] OR "derivations"[All Fields] OR "derivative"[All Fields] OR "derive"[All Fields] OR "derived"[All Fields] OR "derives"[All Fields] OR "deriving"[All Fields]) AND ("valid"[All Fields] OR "validate"[All Fields] OR "validated"[All Fields] OR "validates"[All Fields] OR "validating"[All Fields] OR "validation"[All Fields] OR "validational"[All Fields] OR "validations"[All Fields] OR "validator"[All Fields] OR "validators"[All Fields] OR "validities"[All Fields] OR "validity"[All Fields])) OR (("hypersensitivity"[MeSH Terms] OR "hypersensitivity"[All Fields] OR "sensitive"[All Fields] OR "sensitively"[All Fields] OR "sensitives"[All Fields] OR "sensitivities"[All Fields] OR "sensitivity and specificity"[MeSH Terms] OR ("sensitivity"[All Fields] AND "specificity"[All Fields]) OR "sensitivity and specificity"[All Fields] OR "sensitivity"[All Fields]) AND ("sensitivity and specificity"[MeSH Terms] OR ("sensitivity"[All Fields] AND "specificity"[All Fields]) OR "sensitivity and specificity"[All Fields] OR "specificity"[All Fields] OR "specific"[All Fields] OR "specifically"[All Fields] OR "specification"[All Fields] OR "specifications"[All Fields] OR "specificities"[All Fields] OR "specifics"[All Fields] OR "specifities"[All Fields] OR "specifity"[All Fields])))) AND ("clinical prediction"[Title/Abstract] OR "clinical model"[Title/Abstract] OR "clinical score"[Title/Abstract] OR "clinical scoring"[Title/Abstract] OR "decision guideline"[Title/Abstract] OR "validation study"[Title/Abstract] OR "validation studies"[Title/Abstract] OR "derivation study"[Title/Abstract] OR "screening score"[Title/Abstract] OR "decision rule"[Title/Abstract] OR "diagnostic rule"[Title/Abstract] OR "diagnostic score"[Title/Abstract] OR "predictive outcome"[Title/Abstract] OR "predictive rule"[Title/Abstract] OR "predictive score"[Title/Abstract] OR "predictive value"[Title/Abstract] OR "predictive risk"[Title/Abstract] OR "prediction outcome"[Title/Abstract] OR "prediction rule"[Title/Abstract] OR "prediction score"[Title/Abstract] OR "scoring"[Title/Abstract] OR "prediction value"[Title/Abstract] OR "prediction risk"[Title/Abstract] OR "risk assessment"[Title/Abstract] OR "risk score"[Title/Abstract] OR "risk scoring"[Title/Abstract] OR "prognostic score"[Title/Abstract] OR "prognostic index"[Title/Abstract] OR "prognostic rule"[Title/Abstract] OR "prospective validation"[Title/Abstract] OR ("risk"[Title/Abstract] AND "tool"[Title/Abstract]) OR (("validate"[Title/Abstract] OR "validation"[Title/Abstract] OR "validating"[Title/Abstract] OR "develop"[Title/Abstract] OR "development"[Title/Abstract] OR "derivation"[Title/Abstract] OR "derive"[Title/Abstract] OR "deriving"[Title/Abstract] OR "performance"[Title/Abstract]) AND ("decision"[Title/Abstract] OR "predictive"[Title/Abstract] OR "prediction"[Title/Abstract] OR "rule"[Title/Abstract] OR "score"[Title/Abstract] OR "scoring"[Title/Abstract] OR "index"[Title/Abstract] OR "model"[Title/Abstract] OR "scale"[Title/Abstract] OR "tool"[Title/Abstract] OR "algorithm"[Title/Abstract])) OR ("development"[Title/Abstract] AND "validation"[Title/Abstract]) OR ("derivation"[Title/Abstract] AND "validation"[Title/Abstract]) OR "signs and symptoms"[Title/Abstract] OR ((("PISA"[Title/Abstract] OR "PERC"[Title/Abstract] OR "PESI"[Title/Abstract] OR "Geneva"[Title/Abstract] OR "Wells"[Title/Abstract]) AND "pulmonary embolism"[Title/Abstract]) OR ("Leiden"[Title/Abstract] AND "rheumatoid"[Title/Abstract]) OR "Ottawa ankle"[Title/Abstract] OR "Ottawa knee"[Title/Abstract] OR ("Wells"[Title/Abstract] AND ("thrombosis"[Title/Abstract] OR "thromboembolism"[Title/Abstract])) OR (("ATRIA stroke"[Title/Abstract] OR "ATRIA score"[Title/Abstract] OR "ATRIA risk"[Title/Abstract] OR "ATRIA bleeding"[Title/Abstract] OR "HAS-BLED"[Title/Abstract]) AND ("atrial fibrillation"[Title/Abstract] OR "anticoagulation"[Title/Abstract] OR "anticoagulant"[Title/Abstract])) OR (("Centor"[Title/Abstract] OR "FeverPAIN"[Title/Abstract]) AND ("sore throat"[Title/Abstract] OR "pharyngitis"[Title/Abstract])) OR (("AUDIT score"[Title/Abstract] OR "CRAFFT"[Title/Abstract] OR "AUDIT score"[Title/Abstract] OR "CAGE"[Title/Abstract]) AND ("alcohol"[Title/Abstract] OR "alcoholism"[Title/Abstract])) OR ("CAPRA"[Title/Abstract] AND "prostate"[Title/Abstract]) OR "San Francisco Syncope Rule"[Title/Abstract] OR (("MMSE"[Title/Abstract] OR "MiniCog"[Title/Abstract] OR "Montreal Cognitive Assessment"[Title/Abstract]) AND ("dementia"[Title/Abstract] OR "cognitive impairment"[Title/Abstract])) OR (("ABCD2"[Title/Abstract] OR "ABCD"[Title/Abstract]) AND "transient ischemic attack"[Title/Abstract]) OR (("CHADS2"[Title/Abstract] OR "CHA2DS2-VASc"[Title/Abstract] OR "CHADS-VASC"[Title/Abstract]) AND "atrial fibrillation"[Title/Abstract]) OR (("PHQ-2"[Title/Abstract] OR "PHQ-7"[Title/Abstract]) AND "depression"[Title/Abstract]) OR (("GAD-2"[Title/Abstract] OR "GAD-7"[Title/Abstract]) AND "anxiety"[Title/Abstract]) OR "PC-PTSD"[Title/Abstract] OR "CRB65"[Title/Abstract] OR "CRB-65"[Title/Abstract] OR ("C-WATCH"[Title/Abstract] AND ("bleeding"[All Fields] OR "haemorrhage"[Title/Abstract])) OR "BAP-65"[Title/Abstract] OR "STARWAVE"[Title/Abstract] OR "CURB-65"[Title/Abstract] OR "CURB65"[Title/Abstract]))) AND ('
  //page element variables
  var resultsDiv = document.getElementById("results");   //result div
  var searchBox = document.getElementById("searchBox");   //search box
  var searchButton = document.getElementById("searchButton");   //search button
  var sortMenu = document.getElementById("sortMenu");
  var perPageMenu = document.getElementById("perPageMenu");
  var perpage = perPageMenu.value;
  //var dateMenu = document.getElementById("dateMenu");

  //Loading message
  resultsDiv.innerHTML = '<p>Loading...</p><div class="loader" id="loader"></div>';

  //##########TERM SEARCHING##########
  //get search term
  var sterm = searchBox.value;
  if (sterm == ''){
    return;
  }
  var finalterm = basesterm + sterm + ")";

  //POST request to esearch
  let sparams = {
    db: 'pubmed',
    usehistory: 'y',
    sort: sortMenu.value,
    retmax: 10000,
    term: finalterm
  };
  result = await $.post(sbase, sparams, function(data, status){
    return data;
  });

  //get id string
  let idLen = parseInt(result.getElementsByTagName("Count")[0].innerHTML);
  idLengths = idLen;
  let idreq = '';
  for (let i = 0; i < idLen; i++) {
    idreq += result.getElementsByTagName("Id")[i].innerHTML + ',';
  }
  idreq = idreq.substring(0, idreq.length - 1);

  //POST request to esummary
  let sumparams = {
    db: 'pubmed',
    id: idreq
  };
  summary = await $.post(sumbase, sumparams, function(data, status){
    return data;
  });

  //##########RESULT DISPLAYING##########
  //show results and links
  $('#loader').remove();
  articles = summary.getElementsByTagName("DocSum");
  resultArticles = articles;
  resultsDiv.innerHTML = `<h3>Search Results:</h3>`;
  resultsDiv.innerHTML += `<p>(${idLen} results found)</p>`;

  if (idLen == 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
  }
  else {
    dispResults(articles, 0, perpage, idLen, resultsDiv);
    displayPagination(1, idLen, perpage);
  }
}
