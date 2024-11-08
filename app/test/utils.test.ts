import rand from 'twistrand'
import { describe, expect, it } from 'vitest'
import { shuffle, shuffle2D } from '../utils/algorithm'

describe('algorithm', () => {
  const mt = rand(12345)

  it('shuffle', () => {
    expect(
      shuffle(
        Array.from({ length: 10 }, (_, i) => i),
        (min, max) => mt.randomInt(min, max),
      ),
    ).toMatchSnapshot()
  })

  it('shuffle2D', () => {
    expect(
      shuffle2D(
        Array.from({ length: 10 }, (_, i) => [i]),
        (min, max) => mt.randomInt(min, max),
      ),
    ).toMatchSnapshot()

    expect(
      shuffle2D(
        [[1], [2, 3], [4, 5, 6], [7, 8, 9]],
        (min, max) => mt.randomInt(min, max),
      ),
    ).toMatchSnapshot()
  })
})
