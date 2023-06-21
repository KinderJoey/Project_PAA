import React from 'react'

function bookingValidation(value){
    let error = {};
    if(values.moviename ===""){
        error.moviename = "name shoudl not be empty"
    }
    else{
        error.moviename =""
    }

    if(values.name ===""){
        error.name = "name shoudl not be empty"
    }
    else{
        error.name =""
    }
  
    if(values.banyakTiket ===""){
        error.banyakTiket = "name shoudl not be empty"
    }
    else{
        error.banyakTiket =""
    }    

    if(values.pilihKursi ===""){
        error.pilihKursi = "name shoudl not be empty"
    }
    else{
        error.pilihKursi =""
    }


    return error;
  }

export default bookingValidation