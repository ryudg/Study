function getElement(elOrId: string | HTMLHRElement | null): HTMLElement {
  if (typeof elOrId === "object") {
    return elOrId;
    // ^^^^^^ Type 'string | HTMLElement | null' is not assignable to type 'HTMLElement'.
    //        Type 'null' is not assignable to type 'HTMLElement'.
  } else {
    const el = document.getElementById(elOrId);
    return el;
    // ^^^^^^ Type 'HTMLElement | null' is not assignable to type 'HTMLElement'.
    //        Type 'null' is not assignable to type 'HTMLElement'.
  }
}
