<template>
  <div class="user-profile">
    <div class="user-profile__user-panel">
      <h1 class="user-profile__username">@{{ user.username }}</h1>
      <div class="user-profile__admin-badge" v-if="user.isAdmin">
        Admin
      </div>
      <div class="user-profile__follower-count">
        <strong>Followers: </strong> {{ followers }}
      </div>
      <form
        action=""
        class="user-profile__create-twoot"
        @submit.prevent="createNewTwoot"
        :class="{ '--exceeded': newTwootCharacterCount > 180 }"
      >
        <label for="newTwoot"
          ><strong>New Twoot</strong> ({{ newTwootCharacterCount }}/180)
        </label>
        <textarea name="" id="newTwoot" rows="5" v-model="newTwootContent" />
        <div class="user-profile__create-twoot-type">
          <label for="newTwootType"><strong>Type: </strong> </label>
          <select name="" id="newTwootType" v-model="selectedTwootType">
            <option
              :value="option.value"
              v-for="(option, index) in twootType"
              :key="index"
            >
              {{ option.name }}
            </option>
          </select>
        </div>
        <button>
          Twoot!
        </button>
      </form>
    </div>
    <div class="user-profile__twoots-wrapper">
      <TwootItem
        v-for="twoot in user.twoots"
        :key="twoot.id"
        :username="user.username"
        :twoot="twoot"
        @favourite="toggleFavourite"
      />
    </div>
  </div>
</template>

<script>
import TwootItem from "./TwootItem.vue";
export default {
  name: "User-profile",
  components: { TwootItem },
  data() {
    return {
      newTwootContent: "",
      selectedTwootType: "instant",
      twootType: [
        { value: "draft", name: "Draft" },
        { value: "instant", name: "Instant twoot" }
      ],
      followers: 0,
      user: {
        id: 1,
        username: "_ThanyakonKeawkanok",
        firstName: "Thanaykon",
        lastName: "Keawkanok",
        eamil: "thanyakon.ke.61@uu.ac.th",
        isAdmin: true,
        twoots: [
          {
            id: 1,
            content: "Twotter is Anazing!"
          },
          {
            id: 2,
            content: "Don't forget to subscriber to The Earch is Square!"
          }
        ]
      }
    };
  },
  watch: {
    followers(newFollowerCount, oldFollowerCount) {
      if (oldFollowerCount < newFollowerCount) {
        console.log(`${this.user.username} has gained a follower`);
      }
    }
  },
  computed: {
    newTwootCharacterCount() {
      return this.newTwootContent.length;
    }
    // fullName() {
    //   return `${this.user.firstName} ${this.user.lastName}`;
    // }
  },
  methods: {
    followUser() {
      this.followers++;
    },
    toggleFavourite(id) {
      console.log(`Favourited Twoot #${id}`);
    },
    createNewTwoot() {
      if (this.newTwootContent && this.selectedTwootType !== "draft") {
        this.user.twoots.unshift({
          id: this.user.twoots.length + 1,
          content: this.newTwootContent
        });
        this.newTwootContent = "";
      }
    }
  },
  mounted() {
    this.followUser();
  }
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-auto-columns: 1fr 3fr;
  width: 100%;
  padding: 50px 5%;

  .user-profile__user-panel {
    display: flex;
    flex-direction: column;
    margin-right: auto;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #dfe3e8;

    h1 {
      margin: 0;
    }

    .user-profile__admin-badge {
      background: rebeccapurple;
      color: white;
      border-radius: 5px;
      margin-right: auto;
      padding: 0 10px;
      font-weight: bold;
      margin-top: 10px;
    }
    .user-profile__create-twoot {
      border-top: 1px solid #dfe3e8;
      padding: 20px;
      display: flex;
      flex-direction: column;

      &.--exceeded {
        color: red;
        border-color: red;

        button {
          background-color: red;
          border: none;
          color: white;
        }
      }
    }
  }
  .user-profile__twoots-wrapper {
    display: grid;
    grid-gap: 10px;
  }
}

.user-profile__follower-count {
  margin-top: 10px;
}
</style>