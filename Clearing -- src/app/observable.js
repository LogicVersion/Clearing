
import {observable} from 'rxjs'


function AsyncStream(observer){
  var t1=setTimeout(() => {
    observer.next(Math.random());

  }, 1000);
}
