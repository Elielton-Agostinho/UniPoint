import getDisciplina from '../services/Aluno';
import getPonto from '../services/disciplinas';
import podeMarcar from '../services/Marcacao';

export function getUsuario(matricula){
    return 'Elielton Agostinho'
}

export async function Horario(matricula){
    
    let today=new Date();
    let dSemana = today.getDay();
    let h=today.getHours();
    let m=today.getMinutes();

    let parte1 = '';
    let parte2 = '';
    let parte3 = '';
    if(m < 10){
        m = '0'+m
    }
    let horario = parseFloat(h+'.'+m);

    if (horario > parseFloat('05.59') && horario < parseFloat('12.59')) {
        parte1 = 'M';
        if (horario > parseFloat('05.59') && horario < parseFloat('08.31')) {
            parte3 = 'AB';
        }else{parte3 = 'CD';}
    } else {
        if (horario > parseFloat('12.59') && horario < parseFloat('18.30')) {
            parte1 = 'T';
            if (horario > parseFloat('12.59') && horario < parseFloat('15.31')) {
                parte3 = 'AB';
            }else{
                if (horario > parseFloat('15.30') && horario < parseFloat('18.30')) {
                    parte3 = 'CD';
                }else{parte3 = 'EF';}
            }
        } else {
            if (horario > parseFloat('18.29')) {
                parte1 = 'N';
                if (horario > parseFloat('18.29') && horario < parseFloat('20.31')) {
                    parte3 = 'AB';
                }else{parte3 = 'CD';}
            }
        }
    }

    parte2 = parte1+''+(dSemana+1)+''+parte3;

    console.log(parte2);
    var disc = "0";
    try { 
        disc = await getDisciplina(matricula,parte2);
    } catch (error) {
        console.log('******ERROR: ',error);
    }
    
    return disc;

    
}

export async function AptoMarcacao(disciplina){
    
    var disc = "0";
    try { 
        //setTimeout( function(){
            disc = await podeMarcar(disciplina);
        //}, 2000 );
        
        
    } catch (error) {
        console.log('******AptoMarcacao_ERROR: ',error);
    }
    
    return disc;

    
}

 
//export default (getUsuario)(Horario);