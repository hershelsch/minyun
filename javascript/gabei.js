async function getTheViewPage(){
  return await fetch ('/gabei/view')
}
async function appendViewPage(){
    let ViewPage = await getTheViewPage();
    let ViewPageText = await ViewPage.text();
    document.getElementById('view').innerHTML = ViewPageText;
}
