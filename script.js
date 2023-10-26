// default settings
localStorage.setItem("plan-type","monthly");

/////

document.getElementById("form2").style.display = "none";
document.getElementById("form3").style.display = "none";
document.getElementById("form4").style.display = "none";
document.querySelector(".summary").style.display = "none";

let step_1 = document.getElementById("step-icon-1");
let step_2 = document.getElementById("step-icon-2");
let step_3 = document.getElementById("step-icon-3");
let step_4 = document.getElementById("step-icon-4");

////////////////////////////////////////////////            Form 1            ////////////////////////////////////////////////
const form1 = document.getElementById("form1");

function CheckFrom1(){
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let arr = [name,email,phone];
    let is_fullfil;
    let new_arr = [];


    let msg = "this field is required";
    let msg_p = document.querySelectorAll(".oninvalid-msg");
    msg_p.forEach((v) => v.innerText = "");

    for (let i=0;i<3;i++){
        if (arr[i].value.trim() === "") {
            arr[i].style.cssText = "border: 1px solid hsl(354, 84%, 57%);";
            let p = arr[i].previousElementSibling.lastChild.previousElementSibling;
            p.innerHTML = msg;
            is_fullfil = false;
        }else {
            new_arr.push(arr[i].value);
            is_fullfil = true;
        }   
    }
    return is_fullfil;
}

// if (form1) {
//     form1.addEventListener("submit",function(e){
//         e.preventDefault();
//         console.log(CheckFrom1())
//     })
// }


////////////////////////////////////////////////            Form 2            ////////////////////////////////////////////////

function CheckFrom2(){
    let is_fullfil;
    let get_active_plan = document.querySelector(".active-plan");
    if(get_active_plan){
        is_fullfil = true;
    }else {
        is_fullfil = false;
    }
    return is_fullfil;
}

const plans = document.querySelectorAll(".plan");

if (plans) {
    plans.forEach(function(v,i){
        v.addEventListener("click",function(){
            // add/remove "active-plan" class from the clicked plan
            plans[i].classList.toggle("active-plan");
            // remove "active-plan" class from all plans execept the clicked plan
            plans.forEach((v,k) => {
                if(k != i) {
                    v.classList.remove("active-plan");
                }
            })
        })
    })
}

function switchButton() {
    const switch_container = document.querySelector(".switch-container");
    switch_container.classList.toggle("yearly");
    const monthly = document.getElementById("monthly");
    const yearly = document.getElementById("yearly");

    if (monthly.className === "active-switch") {
        monthly.className = "inactive-switch";
        const plan_price = document.querySelectorAll(".plan-price");
        plan_price[0].innerText = "$90/yr";
        plan_price[1].innerText = "$120/yr";
        plan_price[2].innerText = "$150/yr";

        const plan_description = document.querySelectorAll(".plan-description");
        plan_description.forEach(function(v) {
            v.lastChild.innerText = "";
            let p = document.createElement("p");
            p.className = "promotion";
            p.style.cssText = "margin-top: 4px;font-size: .8rem;color: hsl(213, 96%, 18%);"
            p.innerText = "2 months free";
            v.append(p);
        })
    }else {
        monthly.className = "active-switch";
        localStorage.setItem("plan-type","monthly");
    }

    if (yearly.className === "inactive-switch") {
        yearly.className = "active-switch";
        localStorage.setItem("plan-type","yearly");
    }else {
        yearly.className = "inactive-switch";
        // return the monthly prices
        const plan_price = document.querySelectorAll(".plan-price");
        plan_price[0].innerText = "$9/mo";
        plan_price[1].innerText = "$12/mo";
        plan_price[2].innerText = "$15/mo";
        // remove the promotion "2 months free"
        const promotion = document.querySelectorAll(".promotion");
        promotion.forEach(function(v) {
            v.innerText = "";
        })
    }
}

function getChosedPlan() {
    let get_active_plan = document.querySelector(".active-plan");

    if (get_active_plan) {
        let chosed_plan = get_active_plan.firstElementChild.alt;
        localStorage.setItem("chosed-plan",chosed_plan);
        if (localStorage.getItem("plan-type") === "monthly") {
            if (chosed_plan === "arcade") {
                localStorage.setItem("chosed-plan-price","$9/mo");
            }
            else if (chosed_plan === "advanced") {
                localStorage.setItem("chosed-plan-price","$12/mo");
            }
            else if (chosed_plan === "pro") {
                localStorage.setItem("chosed-plan-price","$15/mo");
            }
        }
        else if (localStorage.getItem("plan-type") === "yearly") {
            if (chosed_plan === "arcade") {
                localStorage.setItem("chosed-plan-price","$9/yr");
            }
            else if (chosed_plan === "advanced") {
                localStorage.setItem("chosed-plan-price","$120/yr");
            }
            else if (chosed_plan === "pro") {
                localStorage.setItem("chosed-plan-price","$150/yr");
            }
        }
    }
}


// if (form2) {
//     form2.addEventListener("submit",function(e){
//         e.preventDefault();
//         if (CheckFrom2() === false) {
//             let display_error_msg = document.querySelector(".if-no-plan-chosed");
//             display_error_msg.innerText = "Please select a plan.";
//             display_error_msg.style.cssText = "color: hsl(354, 84%, 57%);font-weight: 600;";
//         }else {
//             console.log(`Plan Chosed : ${localStorage.getItem("chosed-plan")}`)
//         }
//     })
// }




////////////////////////////////////////////////            Form 3            ////////////////////////////////////////////////

function Checked () {
    const checked = document.querySelectorAll(".checked");
    const add_on = document.querySelectorAll(".add-on");
    let array_of_add_ons = [];

    add_on.forEach(function(v,i){
        
        let first_click = true;


        v.addEventListener("click",function(e){
            
            if (first_click) {
                localStorage.removeItem('chosed-add-ons');

                add_on[i].style.cssText = "background-color: hsl(217, 100%, 97%);border: 1px solid hsl(243, 100%, 62%);";
                checked[i].style.cssText = "display: block";
                
                let price_p = e.currentTarget.children[1].lastElementChild.innerText;

                let add_on_name = e.currentTarget.children[1].firstElementChild.firstElementChild.innerText;

                if (!(array_of_add_ons.includes(add_on_name))) {
                    let obj_template = {
                        add_on_name: add_on_name,
                        add_on_price: price_p
                    }
                    array_of_add_ons.push(obj_template);
                } 
                localStorage.setItem("chosed-add-ons", JSON.stringify(array_of_add_ons));
            }
            else {
                add_on[i].style.cssText = "background-color: #fff;border: 1px solid hsl(229, 24%, 87%);";
                checked[i].style.cssText = "display: none";

                let add_on_name = e.currentTarget.children[1].firstElementChild.firstElementChild.innerText;
                for (let i=0;i<array_of_add_ons.length;i++) {
                    if (array_of_add_ons[i].add_on_name === add_on_name) {
                        array_of_add_ons.splice(i, 1);
                    }
                }
                localStorage.setItem("chosed-add-ons", JSON.stringify(array_of_add_ons));
            }
            first_click = !first_click;
        })
    })
}

function add_on_plan(){
    let plan_type = localStorage.getItem("plan-type");

    if (plan_type === "yearly") {
        const add_on_price = document.querySelectorAll(".add-on-price");
        add_on_price[0].innerText = "+$10/yr";
        add_on_price[1].innerText = "+$20/yr";
        add_on_price[2].innerText = "+$20/yr";
    }
}


// if (from3) {
//     add_on_plan();
//     Checked();
// }

////////////////////////////////////////////////            Form 4            ////////////////////////////////////////////////





function Add_Selected_Add_ons_ToPage() {
    const add_ons_chosed = document.querySelector(".add-ons-chosed");
    if (add_ons_chosed) {
        add_ons_chosed.innerHTML = "";
        let add_ons_chosed_localstorage = JSON.parse(localStorage.getItem("chosed-add-ons"));
        add_ons_chosed_localstorage.forEach(function(v){

            let div = document.createElement("div");
            div.className = "add-on-chosed";
            div.style.cssText = "display: flex;justify-content: space-between;";
            let p1 = document.createElement("p");
            p1.className = "add-on-name";
            p1.style.cssText = "color: hsl(231, 11%, 63%);margin-bottom: 1em;font-size: .9rem;";

            let p2 = document.createElement("p");
            p2.className = "add-on-price";
            p2.style.cssText = "color: hsl(213, 96%, 18%);font-size: .9rem;font-weight: 500;";

            p1.innerText = v.add_on_name;
            p2.innerText = v.add_on_price;

            div.append(p1);
            div.append(p2);
            add_ons_chosed.append(div);

        })
    }
}








function GetTotalPrice() {
    const total__price = document.querySelector(".total--price");
    if (total__price) {
        let price1 = localStorage.getItem("chosed-plan-price");
        let price2 = 0;
        price1 = parseFloat(price1.match(/\d+/));
        let pricex = JSON.parse(localStorage.getItem("chosed-add-ons"));
        pricex.forEach(function(v){
            price2 += parseFloat(v.add_on_price.match(/\d+/));
        })
        

        if (localStorage.getItem("plan-type") === "monthly") {
            total__price.innerText = `+$${price1 + price2}/mo`
        }else if (localStorage.getItem("plan-type") === "yearly") {
            total__price.innerText = `+$${price1 + price2}/yr`
        }
        
    }
}



// if (from4) {
//     const page_plan_chosed = document.querySelector(".chosed-plan");
//     page_plan_chosed.innerText = localStorage.getItem("chosed-plan");
    
//     const page_plan_type = document.querySelector(".plan-type");
//     page_plan_type.innerText = ` (${localStorage.getItem("plan-type")})`;

//     const page_chosed_plan_price = document.querySelector(".chosed-plan-price");
//     page_chosed_plan_price.innerText = localStorage.getItem("chosed-plan-price");

//     if (!(form4.style.display === 'none')){
//         Add_Selected_Add_ons_ToPage();
//         console.log("Add_Selected_Add_ons_ToPage()");
//     }

//     const total__p = document.querySelector(".total--p");

//     if (localStorage.getItem("plan-type") === "monthly") {
//         total__p.innerText = "Total (per month)";
//     }else if (localStorage.getItem("plan-type") === "yearly") {
//         total__p.innerText = "Total (per year)";
//     }
    
//     if (!(form4.style.display === 'none')){
//         GetTotalPrice();
//         console.log("GetTotalPrice()");
//     }
    
// }





//                              TRY multistep form





const back1 = document.getElementById("back1");
const back2 = document.getElementById("back2");
const back3 = document.getElementById("back3");


if (form1) {
    form1.addEventListener("submit",function(e){
        e.preventDefault();
        
        form1.style.display = "none";
        form2.style.display = "block";

        back1.addEventListener("click",function(){
            form1.style.display = "block";
            form2.style.display = "none";
        })
        
        step_1.classList.remove("active-step");
        step_2.classList.add("active-step");

        form2.addEventListener("submit",function(e){
            e.preventDefault();

            step_2.classList.remove("active-step");
            step_3.className = "active-step";

            if (CheckFrom2() === false) {
                let display_error_msg = document.querySelector(".if-no-plan-chosed");
                display_error_msg.innerText = "Please select a plan.";
                display_error_msg.style.cssText = "color: hsl(354, 84%, 57%);font-weight: 600;";
            }else {
                form2.style.display = "none";
                form3.style.display = "block";

                back2.addEventListener("click",function(){
                    form2.style.display = "block";
                    form3.style.display = "none";
                })

                // for form3
                add_on_plan();
                Checked();



                
                form3.addEventListener("submit",function(e){
                    e.preventDefault();

                    step_3.classList.remove("active-step");
                    step_3.classList.add("step-number");
                    step_4.className = "active-step";

                    form3.style.display = "none";
                    form4.style.display = "block";

                    

                    const page_plan_chosed = document.querySelector(".chosed-plan");
                    page_plan_chosed.innerText = localStorage.getItem("chosed-plan");
                    
                    const page_plan_type = document.querySelector(".plan-type");
                    page_plan_type.innerText = ` (${localStorage.getItem("plan-type")})`;
    
                    const page_chosed_plan_price = document.querySelector(".chosed-plan-price");
                    page_chosed_plan_price.innerText = localStorage.getItem("chosed-plan-price");
    
                    
                    Add_Selected_Add_ons_ToPage();
    
                    const total__p = document.querySelector(".total--p");
    
                    if (localStorage.getItem("plan-type") === "monthly") {
                        total__p.innerText = "Total (per month)";
                    }else if (localStorage.getItem("plan-type") === "yearly") {
                        total__p.innerText = "Total (per year)";
                    }
                    
                    
                    GetTotalPrice();


                    back3.addEventListener("click",function(){
                        form3.style.display = "block";
                        form4.style.display = "none";
                    })
                    form4.addEventListener("submit",function(e){
                        e.preventDefault();
                        form4.style.display = "none";
                        form3.style.display = "none";
                        document.querySelector(".summary").style.display = "flex";
                    })
                })                
            }
        })
    })
}

