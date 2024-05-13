export const SendToWhatsApp = async (message) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "qYmbSMGwMRR9+kB!E@6a");
    
        var formdata = new FormData();
        formdata.append("target", "087855405508");
        formdata.append("message", message);
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
    
        const response = await fetch("https://api.fonnte.com/send", requestOptions)
        const data = await response.json()
            
        return data
    } catch (error) {
        console.error(error)
    }
}
