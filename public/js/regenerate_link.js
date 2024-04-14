async function newlink()
{
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('Id')
    let bodyData = await fetch(`http://localhost:3000/auth/regenerate?id=${id}`,{
        method:"POST",
    });
    let al = await bodyData.json();
    console.log(al)
    if(al.code == 1)
    {
        alert(al.message)
        let activationlink = al.activationlink;
        let Id = al.id;
        document.getElementById('rgl').innerHTML = `link regenerated http://localhost:3000/auth/activation?ac=${activationlink}&Id=${Id} For Reseting the password`
    }
    
}