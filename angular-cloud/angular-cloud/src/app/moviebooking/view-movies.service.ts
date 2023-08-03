import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { movie } from "./view-movie.model";
import { Ticket } from "./book-ticket/ticket.model";
import { bookedTicket } from "./book-ticket/bookedTicket.model";
import { environment } from "src/environments/environment.prod";

@Injectable({
    providedIn: 'root'
  })
  export class ViewMoviesService {

    movie:movie;
    bookedticket:bookedTicket;

    sendTicket(bookedTicket:bookedTicket){
      this.bookedticket=bookedTicket;
      localStorage.setItem('ticket',JSON.stringify(this.bookedticket));
      console.log(bookedTicket)
    }
    getTicket(){
      return  JSON.parse(localStorage.getItem('ticket'));
      console.log(this.bookedticket)
    }

    sendData(movi:movie){
        this.movie=movi;
        localStorage.setItem('movie',JSON.stringify(this.movie));
    }

    getData(){
      return JSON.parse(localStorage.getItem('movie'));
        
    }

    constructor(private httpClient: HttpClient,private router: Router) { }

    getAllMovies():Observable<movie[]>{
        return this.httpClient.get<movie[]>(`https://ol4n2yyjz2.execute-api.ap-south-1.amazonaws.com/prod/movie/all`)
      .pipe(catchError(this.handleError))
      };

      handleError(errorResponse: HttpErrorResponse){
        return throwError(errorResponse.error.message);
    }


    getMovieByName(moviename:string):Observable<movie>{
        return this.httpClient.get<movie>(`https://ol4n2yyjz2.execute-api.ap-south-1.amazonaws.com/prod/movie/search/${moviename}`)
      .pipe(catchError(this.handleError))
      };


    bookticket(ticket:Ticket,moviename){
        let body=JSON.stringify(ticket);
        return this.httpClient.post<bookedTicket>(`http://`+environment.applicationUrl+`/movies/${moviename}/add`,body)
      .pipe(catchError(this.handleError))
      };

      // getMovieByNameandTheatre(moviename:string,theatreName:String){
        
      //   return this.httpClient.get<movie>(`http://localhost:8010/retrieve/${moviename}/${theatreName}`)
      // .pipe(catchError(this.handleError))
      // };
      getAllTickets(userName:String){
        return this.httpClient.get<bookedTicket[]>(`http://`+environment.applicationUrl+`/retrieveTickets/${userName}`)
      .pipe(catchError(this.handleError))
      }
     

    
}