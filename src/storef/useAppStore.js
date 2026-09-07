import { create } from 'zustand';

const INITIAL_STORIES = [
  { id: 'user', username: 'Your Story', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150', isUser: true, hasStory: false, storyImage: null },
  { id: 1, username: 'chidi_o', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', hasStory: true, storyImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800' },
  { id: 2, username: 'amara_c', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', hasStory: true, storyImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800' },
  { id: 3, username: 'ijeoma_v', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150', hasStory: true, storyImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800' }
];

const FALLBACK_POSTS = [
  {
    id: 101,
    username: 'chidi_o',
    user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
    caption: 'Building cool interfaces and loving the creative workflow! ✨',
    likes_count: 42,
    is_liked: false,
    is_saved: false,
    comments: []
  },
  {
    id: 102,
    username: 'amara_c',
    user_avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    caption: 'Workplace setup complete! Ready for coding session 🚀',
    likes_count: 88,
    is_liked: false,
    is_saved: false,
    comments: []
  }
];

export const useAppStore = create((set, get) => ({
  activePage: 'home',
  posts: FALLBACK_POSTS,
  explorePosts: FALLBACK_POSTS,
  stories: INITIAL_STORIES,
  notifications: [],
  highlights: [
    { id: 'h1', title: 'Vibes ✨', cover: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300' },
    { id: 'h2', title: 'Travel ✈️', cover: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300' },
    { id: 'h4', title: 'Food 🍝', cover: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300' }
  ],
  following: {},
  activeStory: null,
  userNotes: [],
  isLoading: false,

  userProfile: {
    username: 'catherine',
    fullName: 'Catherine Okoede',
    pronouns: 'she/her',
    bio: 'frontend developer💖',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150'
  },

  setActivePage: (page) => set({ activePage: page }),
  setActiveStory: (story) => set({ activeStory: story }),

  fetchHomeFeed: async () => {
    if (get().posts.length === 0) set({ isLoading: true });

    try {
      const [usersRes, postsRes] = await Promise.all([
        fetch('https://randomuser.me/api/?results=6&inc=name,login,picture').then((res) => res.json()),
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=6').then((res) => res.json())
      ]);

      if (usersRes?.results && postsRes) {
        const fetchedPosts = postsRes.map((post, i) => {
          const user = usersRes.results[i] || {};
          return {
            id: post.id,
            username: user.login?.username || `user_${post.id}`,
            user_avatar: user.picture?.medium || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            image_url: `https://picsum.photos/seed/${post.id + 100}/800/600`,
            caption: post.title,
            likes_count: Math.floor(Math.random() * 80) + 12,
            is_liked: false,
            is_saved: false,
            comments: []
          };
        });

        const apiStories = usersRes.results.slice(0, 4).map((u, idx) => ({
          id: `api_${idx + 1}`,
          username: u.login.username,
          avatar: u.picture.medium,
          hasStory: true,
          storyImage: `https://picsum.photos/seed/story_${idx}/800/1200`
        }));

        set((state) => ({
          posts: fetchedPosts,
          stories: [
            state.stories[0],
            ...INITIAL_STORIES.slice(1), 
            ...apiStories 
          ]
        }));
      }
    } catch (err) {
      console.warn('API fetch failed, retaining existing feed:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchExploreFeed: async () => {
    try {
      const usersRes = await fetch('https://randomuser.me/api/?results=6&inc=login,picture').then((res) => res.json());

      if (usersRes?.results) {
        const exploreItems = usersRes.results.map((u, idx) => ({
          id: 200 + idx,
          username: u.login.username,
          user_avatar: u.picture.medium,
          image_url: `https://picsum.photos/seed/explore_${idx}/800/600`,
          caption: 'Discovering aesthetic moments ✨',
          likes_count: Math.floor(Math.random() * 150) + 20,
          is_liked: false,
          is_saved: false,
          comments: []
        }));

        set({ explorePosts: exploreItems });
      }
    } catch (err) {
      console.warn('Failed to fetch explore feed:', err);
    }
  },

  updateProfile: (updatedData) => set((state) => ({
    userProfile: { ...state.userProfile, ...updatedData }
  })),

  addNote: (text) => set((state) => ({
    userNotes: [{ id: Date.now(), text, time: 'Just now' }, ...state.userNotes]
  })),

  toggleLike: (postId, isExplore = false) => {
    const targetKey = isExplore ? 'explorePosts' : 'posts';
    set((state) => {
      const targetPost = state[targetKey].find((p) => p.id === postId);
      const willBeLiked = !targetPost?.is_liked;

      const newNotif = willBeLiked ? [{
        id: Date.now(),
        username: state.userProfile.username,
        avatar: state.userProfile.avatar,
        type: 'like',
        text: `liked ${targetPost?.username}'s post.`
      }] : [];

      return {
        [targetKey]: state[targetKey].map((p) =>
          p.id === postId
            ? { ...p, is_liked: !p.is_liked, likes_count: p.is_liked ? p.likes_count - 1 : p.likes_count + 1 }
            : p
        ),
        notifications: [...newNotif, ...state.notifications]
      };
    });
  },

  toggleBookmark: (postId, isExplore = false) => {
    const targetKey = isExplore ? 'explorePosts' : 'posts';
    set((state) => {
      const targetPost = state[targetKey].find((p) => p.id === postId);
      const willBeSaved = !targetPost?.is_saved;

      const newNotif = willBeSaved ? [{
        id: Date.now(),
        username: state.userProfile.username,
        avatar: state.userProfile.avatar,
        type: 'save',
        text: `saved ${targetPost?.username}'s post.`
      }] : [];

      return {
        [targetKey]: state[targetKey].map((p) =>
          p.id === postId ? { ...p, is_saved: !p.is_saved } : p
        ),
        notifications: [...newNotif, ...state.notifications]
      };
    });
  },

  addComment: (postId, text, isExplore = false) => {
    const targetKey = isExplore ? 'explorePosts' : 'posts';
    set((state) => {
      const targetPost = state[targetKey].find((p) => p.id === postId);
      const newNotif = {
        id: Date.now(),
        username: state.userProfile.username,
        avatar: state.userProfile.avatar,
        type: 'comment',
        text: `commented on ${targetPost?.username}'s post: "${text}"`
      };

      return {
        [targetKey]: state[targetKey].map((p) =>
          p.id === postId
            ? { ...p, comments: [...p.comments, { id: Date.now(), username: state.userProfile.username, text }] }
            : p
        ),
        notifications: [newNotif, ...state.notifications]
      };
    });
  },

  addPost: (caption, image_url) => {
    set((state) => {
      const newPost = {
        id: Date.now(),
        username: state.userProfile.username,
        user_avatar: state.userProfile.avatar,
        image_url: image_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
        caption,
        likes_count: 0,
        is_liked: false,
        is_saved: false,
        comments: []
      };

      return {
        posts: [newPost, ...state.posts],
        notifications: [{
          id: Date.now(),
          username: state.userProfile.username,
          avatar: state.userProfile.avatar,
          type: 'post',
          text: 'published a new post.'
        }, ...state.notifications]
      };
    });
  },

  addUserStory: (image_url) => {
    set((state) => ({
      stories: state.stories.map((s) =>
        s.isUser ? { ...s, hasStory: true, storyImage: image_url } : s
      ),
      notifications: [{
        id: Date.now(),
        username: state.userProfile.username,
        avatar: state.userProfile.avatar,
        type: 'story',
        text: 'added a new story.'
      }, ...state.notifications]
    }));
  },

  toggleFollow: (username, customUserObj = null) => {
    set((state) => {
      const isCurrentlyFollowing = !!state.following[username];
      const newFollowing = { ...state.following, [username]: !isCurrentlyFollowing };

      let updatedPosts = [...state.posts];

      if (!isCurrentlyFollowing) {
        let userPosts = state.explorePosts.filter((p) => p.username === username);

        if (userPosts.length === 0) {
          const avatar = customUserObj?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';
          userPosts = [{
            id: Date.now(),
            username,
            user_avatar: avatar,
            image_url: `https://picsum.photos/seed/${username}/800/600`,
            caption: `Hey everyone! Following back ✨`,
            likes_count: Math.floor(Math.random() * 50) + 10,
            is_liked: false,
            is_saved: false,
            comments: []
          }];
        }

        userPosts.forEach((p) => {
          if (!updatedPosts.some((existing) => existing.id === p.id)) {
            updatedPosts.unshift(p);
          }
        });
      } else {
        updatedPosts = updatedPosts.filter((p) => p.username !== username || p.username === state.userProfile.username);
      }

      return {
        following: newFollowing,
        posts: updatedPosts,
        notifications: !isCurrentlyFollowing ? [{
          id: Date.now(),
          username: state.userProfile.username,
          avatar: state.userProfile.avatar,
          type: 'follow',
          text: `started following ${username}.`
        }, ...state.notifications] : state.notifications
      };
    });
  }
}));