import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  getWeather(city: string): Observable<any> {
    return this.httpService
      .get(process.env.OPEN_WEATHER_URL, {
        params: {
          q: city,
          appid: process.env.OPEN_WEATHER_API_KEY,
          units: 'metric',
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error(
            'Error Details:',
            error.response?.data || error.message,
          );
          return throwError(
            () =>
              new HttpException(
                `Weather data retrieval failed: ${error.response?.data?.message || error.message}`,
                HttpStatus.BAD_REQUEST,
              ),
          );
        }),
      );
  }
}
