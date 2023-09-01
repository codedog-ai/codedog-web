<template>
  <DocsPageLayout class="fluid">
    <!-- <form class="form-widget" @submit.prevent="updateProfile">
    </form> -->
    <!-- <Avatar v-model:path="user.user_metadata.avatar_url" :size="10" />
    <ProseH2>{{ user.user_metadata.avatar_url }}</ProseH2> -->
    
    <ProseH2>Your Account Details</ProseH2>
    <ProseP>Email: {{ user.email }}</ProseP>
    <ProseP>Username: {{ user.user_metadata.user_name }}</ProseP>
    <ButtonLink icon="IconStackBlitz" @click="signOut">
      Sign Out
    </ButtonLink>

    <!-- <button type="button" class="button block" @click="signOut">
      Sign Out
    </button>
    -->
    <!-- <ProseH2>Your Projects</ProseH2>
    <List v-for="project in projects" :key="project.id" class="primary">
      {{ project.name }} - {{ project.full_name }} - {{ project.url }} 
    </List>
    <ProseH2 />
     -->
    <ProseH2>Your Installations</ProseH2>
<!-- 
    <List v-for="installation in installations" :key="installation.id" class="primary">
      {{ installation.id }} - {{ installation.account.login }} - {{ installation.account.type }} - {{ installation.html_url }}
    </List> -->
    

    <div v-for="installation in installations" :key="installation.id">
      <ProseH3>Installation id {{ installation.id }} Installation account: {{ installation.account.login }}</ProseH3>
      <List v-for="repo in installation_repos[installation.id]" :key="repo.id">
        {{ repo.id }} -- {{ repo.name }} -- {{ repo.full_name }} -- {{ repo.html_url }}
      </List>
    </div>
    <ProseH2 />
    

    <ButtonLink icon="IconStackBlitz" href="https://github.com/apps/codedog-assistant/installations/new" blank>
      Add additional repositories.
    </ButtonLink>
  </DocsPageLayout>
</template>
  
<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const username = ref('')
const website = ref('')
const avatar_path = ref('')
const user = useSupabaseUser();
// console.log(user)
// 这个逻辑用于邮箱登录的用户
// const { data: profile } = await useAsyncData('profile', async () => {
//     loading.value = true
//     const { data } = await supabase
//         .from('profiles')
//         .select(`username, website, avatar_url`)
//         .eq('id', user.value.id)
//         .single()

//     loading.value = false
//     return data
// })

// if (profile.value.username) {
//     username.value = profile.value.username
//     website.value = profile.value.website
//     avatar_path.value = profile.value.avatar_url
// }


async function updateProfile() {
    try {
        loading.value = true
        const user = useSupabaseUser();
        const updates = {
            id: user.value.id,
            username: username.value,
            website: website.value,
            avatar_url: avatar_path.value,
            updated_at: new Date(),
        }
        const { error } = await supabase.from('profiles').upsert(updates)
        if (error) throw error
    } catch (error) {
        alert(error.message)
    } finally {
        loading.value = false
    }
}
import { useRouter } from '#app'

const router = useRouter()

async function signOut() {
    try {
        loading.value = true
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        router.push('/')
    } catch (error) {
        alert(error.message)
    } finally {
        loading.value = false
    }
}

async function getSession() {
    const { data, error } = await supabase.auth.getSession()
    return data.session
}

const fetchUserRepos = async (accessToken) => {
  const response = await fetch('https://api.github.com/user/repos', {
    headers: {
      'Authorization': `token ${accessToken}`,
    },
  });

  if (response.ok) {
    const projects = await response.json();
    console.log('GitHub Repos:', projects);
    return projects;
  } else {
    console.log('Failed to fetch repos:', response.status, await response.text());
    return [];  
  }
}


const fetchUserInstallations = async (accessToken) => {
  const response = await fetch('https://api.github.com/user/installations', {
    headers: {
      'Authorization': `token ${accessToken}`,
    },
  });

  if (response.ok) {
    const resp = await response.json();
    const installations = resp.installations;
    console.log('GitHub installations:', installations);
    return installations;
  } else {
    console.log('Failed to fetch repos:', response.status, await response.text());
    return [];  
  }
}


const fetchUserInstallationRepo = async (installation_id, accessToken) => {
  const url = 'https://api.github.com/user/installations/' + installation_id + '/repositories'
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${accessToken}`,
    },
  });
  console.log(url)
  if (response.ok) {
    const resp = await response.json();
    console.log('GitHub installations:', resp);
    return resp;
  } else {
    console.log('Failed to fetch repos:', response.status, await response.text());
    return [];  
  }
}



const projects = ref([])
const installations = ref([])
const installation_repos = ref({})
onMounted(async () => {
  const session = await getSession();
  projects.value = await fetchUserRepos(session.provider_token);
  installations.value = await fetchUserInstallations(session.provider_token);
  
  for (const installation of installations.value) {
    const repos = await fetchUserInstallationRepo(installation.id, session.provider_token);
    installation_repos.value[installation.id] = repos.repositories;
    console.log("repo", repos.repositories)
  }
});


</script>
