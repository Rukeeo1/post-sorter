import { mount } from '@vue/test-utils'

import { describe, it, expect, vi, beforeEach} from 'vitest'
import App from '../../App.vue'

const postTestData = [
  {
    userId: 1,
    id: 1,
    title: 'Post 1',
    body: 'Body 1'
  },
  {
    userId: 2,
    id: 2,
    title: 'Post 2',
    body: 'Body 2'
  },
  {
    userId: 3,
    id: 3,
    title: 'Post 3',
    body: 'Body 3'
  },
  {
    userId: 4,
    id: 4,
    title: 'Post 4',
    body: 'Body 4'
  },
  {
    userId: 5,
    id: 5,
    title: 'Post 5',
    body: 'Body 5'
  }
]

const getComponentWrapper = () => {
  return mount(App, {
    global: {
      stubs: ['PostList', 'ActionList']
    }
  })
}

global.fetch = vi.fn()

function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)), ok: true }
}

beforeEach(() => {
  (fetch as any).mockReset()
})

describe('<App />', () => {
  ;(fetch as any).mockResolvedValue(createFetchResponse(postTestData))

  const wrapper = getComponentWrapper()

  it('it mounts the component and displays the page title', async () => {
    expect(wrapper.find('.app__posts__title').text()).toBe('Sortable Post List')
  })

  it('fetches the post', () => {
    expect(wrapper.vm.posts.length).toEqual(postTestData.length)
  })

  it('should move a post up the list, when the up arrow is clicked', async () => {
    const fromIndex = 1
    const toIndex = 0

    wrapper.vm.movePostUp(fromIndex) // moving the post at index 1 to index 0.

    await wrapper.vm.$nextTick()

    expect(postTestData[fromIndex].id).toBe(wrapper.vm.posts[toIndex].id)
    expect(postTestData[fromIndex].title).toBe(wrapper.vm.posts[toIndex].title)
  })

  it('should move a post down the list, when the down is clicked', async () => {
    const fromIndex = 3
    const toIndex = 4

    wrapper.vm.movePostDown(fromIndex)

    await wrapper.vm.$nextTick()

    expect(postTestData[fromIndex].id).toBe(wrapper.vm.posts[toIndex].id)
    expect(postTestData[fromIndex].title).toBe(wrapper.vm.posts[toIndex].title)

    expect(wrapper.vm.posts[4].id).toBe(postTestData[3].id)
  })

  it('should track the users actions when a post is moved up', async () => {
    const fromIndex = 3
    const toIndex = 4
    // clear out existing actions
    wrapper.vm.actions = []

    // move a post
    wrapper.vm.movePostDown(3)

    expect(wrapper.vm.actions[0].movedFrom).toBe(fromIndex)
    expect(wrapper.vm.actions[0].movedTo).toBe(toIndex)
  })

  it('should go back in time, when the time travel button is clicked', () => {

  })
})
