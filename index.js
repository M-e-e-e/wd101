let form=document.getElementById("form");

let entries=[];

const retrieve=()=>{
    let data=localStorage.getItem("entries");
    if(data){
        data=JSON.parse(data);
    } else{
        data=[];
    }
    return data;
}

const display=()=>{
    let data=retrieve();
    const toSend=data.map((entry)=>{
        const name=`<td class="p-3">${entry.name}</td>`;
        const email=`<td class="p-3">${entry.email}</td>`;
        const password=`<td class="p-3">${entry.password}</td>`;
        const dob=`<td class="p-3">${entry.dob}</td>`;
        const accept=`<td class="p-3">${entry.accepted}</td>`;
        const row=`<tr>${name} ${email} ${dob} ${accept}</tr>`;
        return row;
    }).join("\n");
    document.getElementById("rowEntries").innerHTML=toSend;
}

const saved=(event)=>{
    event.preventDefault();
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const dob=document.getElementById("dob").value;

    const accepted=document.getElementById("accept").checked;

    const today=new Date();
    const checkDate=new Date(dob);
    let age=today.getFullYear()-checkDate.getFullYear();
    const monthDiff=today.getMonth()-checkDate.getMonth();
    const dayDiff=today.getDate()-checkDate.getDate();
    
    if (monthDiff<0||(monthDiff===0&&dayDiff<0)) 
    {
        age--;
    }
    let w=document.getElementById("warn");
    if(age<18)
    {
        let d=new Date();
        d.setFullYear(today.getFullYear()-18);
        alert("Date of birth must be $(d) or earlier.")
        return;
    } 
    else if(age>55){
        let d=new Date();
        d.setFullYear(today.getFullYear()-55);
        alert("Date of birth must be $(d) or later.");
        return;
    }

    const entry={
        name,email,password,dob,accepted
    };

    entries.push(entry);
    localStorage.setItem("entries",JSON.stringify(entries));

    display();
}


form.addEventListener("submit",saved);

