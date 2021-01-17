import { IChamferableBodyDefinition } from 'matter-js'

export enum BreakoutBodyCatagories {
  Player =         0b00000000000000000000000000000001,
  Ball =           0b00000000000000000000000000000010,
  Block =          0b00000000000000000000000000000100,
  Boundary =       0b00000000000000000000000000001000,
  BoundryBottom =  0b00000000000000000000000000010000,
  BoundryTop =     0b00000000000000000000000000100000,
}

export const AllMask = 0b11111111111111111111111111111111;
export const NoMask =  0b00000000000000000000000000000000;

export enum BreakoutBodyMask {
  Player =         AllMask,
  Ball =           AllMask,
  Block =          AllMask & ~(BreakoutBodyCatagories.Block),
  Boundary =       AllMask,
  BoundryBottom =  NoMask | BreakoutBodyCatagories.Player,
  BoundryTop =     AllMask & ~(BreakoutBodyCatagories.Block)
}

// export const GlobalGroup = 1;

export const boundary_options: IChamferableBodyDefinition = {
  isStatic: true,
  collisionFilter: {
    category: BreakoutBodyCatagories.Boundary,
    mask: BreakoutBodyMask.Boundary
  },
  label: undefined
}

export const boundary_bottom_options: IChamferableBodyDefinition = {
  ...boundary_options,
  collisionFilter: {
    category: BreakoutBodyCatagories.BoundryBottom,
    mask: BreakoutBodyMask.BoundryBottom
  }
}

export const boundary_top_options: IChamferableBodyDefinition = {
  ...boundary_options,
  collisionFilter: {
    category: BreakoutBodyCatagories.BoundryTop,
    mask: BreakoutBodyMask.BoundryTop
  }
}

export const ball_options: IChamferableBodyDefinition = {
  restitution: 1.01,
  frictionAir: 0,
  friction: 0,
  inertia: Infinity,
  density: 0.00000000001,
  collisionFilter: {
    category: BreakoutBodyCatagories.Ball,
    mask: BreakoutBodyMask.Ball
  },
  label: undefined
}

export const block_options: IChamferableBodyDefinition = {
  density: 10,
  collisionFilter: {
    category: BreakoutBodyCatagories.Block,
    mask: BreakoutBodyMask.Block
  }
}

export const player_options: IChamferableBodyDefinition = {
  // isStatic: true
  inertia: Infinity,
  frictionAir: 0.2,
  friction: 0,
  collisionFilter: {
    category: BreakoutBodyCatagories.Player,
    mask: BreakoutBodyMask.Player
  },
  label: undefined
}