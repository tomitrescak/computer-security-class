declare module 'sweetalert' {
  export default function swal(...any: any[]): void;
}

declare module 'sweetalert2' {
  export default function swal(...any: any[]): any;
  export default function sweetalert(...any: any[]): any;
}