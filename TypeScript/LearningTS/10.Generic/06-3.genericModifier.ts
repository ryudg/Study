// 10.Generic/06-3.genericModifier.ts

function inTheEnd<First, Second, Third = number, Fourth = string>() {}

function inTheMiddle<First, Second = boolean, Third = number, Fourth>() {}
//                                                            ^^^^^^ Required type parameters may not follow optional type parameters.
