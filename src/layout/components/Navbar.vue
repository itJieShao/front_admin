<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu-box">
      <div class="message-box" @click="jumpMsg">
        <i
          style="font-size: 20px; color: #666"
          class="el-icon-message-solid"
        ></i>
        <span class="message-tip" v-if="user.messageCount > 0">{{
          user.messageCount
        }}</span>
      </div>
      <p class="right-menu-user">{{ userName }}</p>
      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
              class="user-avatar"
            />
            <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> 首页 </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="dialogFormPwd = true">
              <span style="display: block">修改密码</span>
            </el-dropdown-item>
            <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
            <el-dropdown-item divided @click.native="logout">
              <span style="display: block">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <el-dialog title="修改密码" :visible.sync="dialogFormPwd">
      <el-form label-width="80px">
        <el-form-item label="新密码">
          <el-input
            type="password"
            placeholder="请输入新密码"
            v-model="pwd"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            type="password"
            placeholder="请再次输入新密码"
            v-model="again_pwd"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormPwd = false">取 消</el-button>
        <el-button type="primary" @click="changePwd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { messageCount } from "@/api/message";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  created() {
    this.messageCount();
    setInterval(() => {
      this.messageCount();
    },10000) 
  },
  data() {
    return {
      dialogFormPwd: false,
      pwd: "",
      again_pwd: "",
    };
  },
  computed: {
    userName() {
      return localStorage.getItem("userName") || "";
    },
    ...mapState(["user"]),
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    jumpMsg() {
      this.$router.push("/message/index?type=wd");
    },
    messageCount() {
      messageCount({ user_id: localStorage.getItem("userId") }).then((res) => {
        this.$store.commit("user/SET_MSG_COUNT", res.count);
      });
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async changePwd() {
      if (!this.pwd || !this.again_pwd) {
        return this.$message({
          message: "请输入新密码",
          type: "error",
          duration: 1000,
        });
      }
      if (this.pwd != this.again_pwd) {
        return this.$message({
          message: "两次输入的密码不一致",
          type: "error",
          duration: 1000,
        });
      }
      let res = await this.$store.dispatch("user/changePwd", {
        id: localStorage.getItem("userId"),
        password: this.pwd,
      });
      if (res) {
        this.dialogFormPwd = false;
        this.$notify({
          title: "成功",
          message: "修改密码成功，请重新登录",
          type: "success",
          duration: 1000,
          onClose: () => {
            this.$router.push("/login");
          },
        });
      }
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.message-box {
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
}
.message-tip {
  margin-left: -5px;
  margin-top: -5px;
  background-color: red;
  color: #fff;
  padding: 2px 5px;
  border-radius: 50%;
  font-size: 12px;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu-box {
    display: flex;
    justify-content: flex-end;
    .right-menu-user {
      font-size: 14px;
      color: #666;
      line-height: 50px;
      margin-right: 10px;
    }
    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
