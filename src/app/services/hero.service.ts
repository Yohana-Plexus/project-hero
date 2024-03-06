import { Injectable } from '@angular/core';
import { ApiRestService } from './api-rest/api-rest.service';
import { Hero } from '../models/hero';
import { Observable, delay, of, tap } from 'rxjs';
import { heroMockData } from './mocks/hero-mock';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly serviceUrl;
  private heroList: Hero[] | null = null; // Variable para almacenar la lista de héroes

  constructor(private readonly apiRestService: ApiRestService) {
    this.serviceUrl = 'mockData';
  }

  public list(): Observable<Hero[]> {
    if (this.serviceUrl.includes('mock')) {
      return this.heroList
        ? of(this.heroList).pipe(delay(3000))
        : of(heroMockData as Hero[]).pipe(
            delay(3000),
            tap((heroes) => (this.heroList = heroes))
          );
    } else {
      return this.apiRestService.get<Hero[]>(`${this.serviceUrl}/filter`);
    }
  }

  public find(heroName: string): Observable<Hero[]> {
    if (this.serviceUrl.includes('mock')) {
      const sourceArray = this.heroList ? this.heroList : heroMockData;
      return of(
        sourceArray.filter((hero) =>
          hero.name.toLowerCase().includes(heroName)
        ) as Hero[]
      );
    } else {
      return this.apiRestService.post<Hero[], { name: string }>(
        `${this.serviceUrl}/filter`,
        { name: heroName }
      );
    }
  }

  public delete(id: number): Observable<Hero[]> {
    if (this.serviceUrl.includes('mock')) {
      const sourceArray = this.heroList ? this.heroList : heroMockData;
      this.heroList = sourceArray.filter((hero) => hero.id !== id);
      return of(this.heroList as Hero[]).pipe(delay(1500));
    } else {
      return this.apiRestService.delete<Hero[]>(`${this.serviceUrl}/${id}`);
    }
  }

  public save(hero: Hero): Observable<Hero[]> {
    if (this.serviceUrl.includes('mock')) {
      if (!hero.id) {
        // Asignar un nuevo ID si el héroe no tiene uno
        hero.id = Math.floor(Math.random() * 1000);
      }
      const sourceArray = this.heroList ? this.heroList : heroMockData;
      const existingHeroIndex = sourceArray.findIndex((h) => h.id === hero.id);

      existingHeroIndex !== -1
        ? (sourceArray[existingHeroIndex] = hero) // Si ya existe un héroe con el mismo id, actualiza ese héroe
        : sourceArray.push(hero); // Si no existe, agrega el nuevo héroe

      this.heroList = sourceArray;

      return of([...this.heroList]);
    } else {
      return this.apiRestService.post<Hero[], Hero>(`${this.serviceUrl}`, hero);
      // return this.apiRestService.post<CountryParams, CountryParams>(`${this.serviceUrl}`, body)
    }
  }
}
