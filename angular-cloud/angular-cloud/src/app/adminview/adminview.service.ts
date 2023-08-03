import { Injectable } from "@angular/core";
import { movie } from "../moviebooking/view-movie.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment.prod";



@Injectable({
    providedIn: 'root'
  })
export  class AdminViewService{

    constructor(private httpClient: HttpClient){}

    addMovie(Movie:any){
        let body=JSON.stringify(Movie);
        console.log(body)
        return this.httpClient.post<movie>(`http://`+environment.applicationUrl+`/movies/add`,body)
      .pipe(catchError(this.handleError))
      };

      handleError(errorResponse: HttpErrorResponse){
        return throwError(errorResponse.error.message);
    }

    getTotalTickets(movieName:string){
      return this.httpClient.get<number>(`http://`+environment.applicationUrl+`/fetchNoOfTicketsBookedForAMove/${movieName}`)
      .pipe(catchError(this.handleError))
      }

    getTotalTicketsByTheatre(movieName:string,theaterName:string){
        return this.httpClient.get<number>(`http://`+environment.applicationUrl+`/fetchNoOfTicketsAvailableForAMoveByTheaterName/${movieName}/${theaterName}`)
        .pipe(catchError(this.handleError))
        }

    setStatus(movieName:string,theatreName:string,ticketcount:string){
          return this.httpClient.put(`http://`+environment.applicationUrl+`/ticketstatus/`,{movieName,theatreName,ticketcount})
          .pipe(catchError(this.handleError))
    }

    deleteMovies(moviename:string){
            return this.httpClient.delete(`http://`+environment.applicationUrl+`/${moviename}`)
            .pipe(catchError(this.handleError))
            }
    deleteByTheatres(moviename:string,theaterName:string){
              return this.httpClient.delete(`http://`+environment.applicationUrl+`/${moviename}/${theaterName}`)
              .pipe(catchError(this.handleError))
              }
    }

    

    

