import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VersionCheckService {
  // this will be replaced by actual hash post-build.js
  private currentHash = 'xxx'; //'{{POST_BUILD_ENTERS_HASH_HERE}}';
  private POST_BUILD_ENTERS_HASH_HERE = 'xxx';

  constructor(private http: HttpClient) {}

  /**
   * Checks in every set frequency the version of frontend application
   * @param url
   * @param {number} frequency - in milliseconds, defaults to 30 minutes
   */
  public initVersionCheck(url: string, frequency = 1000 * 60 * 30) {
    setTimeout(() => {
      this.checkVersion(url);
    }, 1000);
  }

  /**
   * Will do the call and check if the hash has changed or not
   * @param url
   */
  private checkVersion(url: string) {
    // timestamp these requests to invalidate caches
    this.http
      .get(url + '?t=' + new Date().getTime())
      .pipe(first())
      .subscribe(
        (response: any) => {
          const hash = response.hash;
          const hashChanged = this.hasHashChanged(this.currentHash, hash);

          // If new version, do something
          if (hashChanged) {
            // ENTER YOUR CODE TO DO SOMETHING UPON VERSION CHANGE
            // for an example: location.reload();
          }
          // store the new hash so we wouldn't trigger versionChange again
          // only necessary in case you did not force refresh
          this.currentHash = hash;
        },
        (err) => {
          console.error(err, 'Could not get version');
        }
      );
  }

  /**
   * Checks if hash has changed.
   * This file has the JS hash, if it is a different one than in the version.json
   * we are dealing with version change
   * @param currentHash
   * @param newHash
   * @returns {boolean}
   */
  private hasHashChanged(currentHash: string, newHash: string) {
    if (!currentHash || currentHash === this.POST_BUILD_ENTERS_HASH_HERE) {
      return false;
    }

    return currentHash !== newHash;
  }
}
