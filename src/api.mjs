import axios from 'axios'
try {

     const response = await axios('https://run.mocky.io/v3/b2821f97-3be8-4774-ad63-7d600f05cd6b')
    let arrbrands=['adidas','hush puppies','nike','ndure','reebok']
    let arrcolors=['orange','blue','black','white','brown']
    let userinput = 'i am looking for blue shoes'
    let userinputbothcolornbrand = 'i am looking for white shoes in adidas'
    let userinputonlybrand = 'i am looking for nike shoes'
    let userlookingforcolor, userlookingforbrand
    userlookingforcolor = getColor(userinputbothcolornbrand)
    //console.log(userlookingforcolor)
    userlookingforbrand=getBrand(userinputbothcolornbrand)
    //console.log(userlookingforbrand)
    let matching=[]
     let s=response.data.shoes
     let c
     for (let index = 0; index < s.length; index++) {
        if (s[index].color==userlookingforcolor) {
            c=s[index]
            break
        }
     }
        //console.log(`brand is ${c.brand} and color is ${c.color}`)
        for (let index = 0; index < s.length; index++) {
            if (s[index].brand==userlookingforbrand) {
                c=s[index]
                break
            }
        }
        console.log(c)
    /**Gets the color user is looking for from the input , if color is not found returns empty string  */
    function getColor(input){
        let tokens = input.split(' ')
        let answer = ''
        for (let i= 0; i < arrcolors.length; i++) {
            let found = tokens.includes(arrcolors[i]) // orange
            if (found==true) {
                answer = arrcolors[i]
                break
            }
        }
        return answer
    }
    function getBrand(input){
        let tokens = input.split(' ')
        let answer = ''
        for (let i= 0; i < arrbrands.length; i++) {
            let found = tokens.includes(arrbrands[i]) // orange
            if (found==true) {
                answer = arrbrands[i]
                break
            }
        }
        return answer
    }
    
    // let status = response.data.status
    // let shoes = response.data.shoes
    // //console.log(response.data);
    // //console.log('My status is ', status)
    // //console.log(`My status is ${status}`)
    // console.log('Shoes are:')
    // let firstShoe = shoes[0]
    // let secondShoe = shoes[1]

    // console.log(`First shoe is of brand ${firstShoe.brand} its color is ${firstShoe.color} and its picture is at : ${firstShoe.picture}`)
    // console.log("First shoe is of brand ",firstShoe.brand," its color is ",firstShoe.color," and its picture is at :", firstShoe.picture)
    // console.log("First shoe is of brand "+firstShoe.brand+" its color is "+firstShoe.color+" and its picture is at :"+ firstShoe.picture)
}
catch (e) {
    console.error(e)
}
