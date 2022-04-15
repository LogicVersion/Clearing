
import { observable } from "rxjs";

function AsyncStream(){
  var t1=setTimeout(() => {
    observer.next(Math.random());
  }, 1000);
}

 console.log("hello");


