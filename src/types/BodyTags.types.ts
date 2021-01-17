import { IChamferableBodyDefinition } from 'matter-js'

export enum BreakoutBodyCatagories {
  Player =   0b00000000000000000000000000000001,
  Ball =     0b00000000000000000000000000000010,
  Block =    0b00000000000000000000000000000100,
  Boundary = 0b00000000000000000000000000001000,
}

export var GlobalGroup = 1;

export const boundary_options: IChamferableBodyDefinition = {
  isStatic: true,
  collisionFilter: {
    category: BreakoutBodyCatagories.Boundary,
    group: GlobalGroup
  },
  label: undefined
  
}

export const ball_options: IChamferableBodyDefinition = {
  restitution: 1.01,
  frictionAir: 0,
  friction: 0,
  inertia: Infinity,
  density: 0.00000000001,
  collisionFilter: {
    category: BreakoutBodyCatagories.Ball,
    group: GlobalGroup
  },
  label: undefined
}

export const block_options: IChamferableBodyDefinition = {
  density: 10,
  collisionFilter: {
    category: BreakoutBodyCatagories.Block,
    group: GlobalGroup
  }
}

export const player_options: IChamferableBodyDefinition = {
  // isStatic: true
  inertia: Infinity,
  frictionAir: 0.2,
  friction: 0,
  collisionFilter: {
    category: BreakoutBodyCatagories.Player,
    group: GlobalGroup
  },
  label: undefined
}