<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="info"
          icon="mdi-twitter"
          title="Followers"
          value="+238"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="primary"
          icon="mdi-poll"
          title="Website Visits"
          value="75.521"
          sub-icon="mdi-tag"
          sub-text="Tracked from Google Analytics"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="info"
          icon="mdi-store"
          title="Revenue"
          value="$ 34,245"
          sub-icon="mdi-calendar"
          sub-text="Last 24 Hours"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="secondary"
          icon="mdi-sofa"
          title="Bookings"
          value="184"
          sub-icon="mdi-alert"
          sub-icon-color="red"
          sub-text="Get More Space..."
        />
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="secondary"
          hover-reveal
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Website Views
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Last Campaign Performance
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="primary"
          hover-reveal
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Daily Sales
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            <v-icon
              color="green"
              small
            >
              mdi-arrow-up
            </v-icon>
            <span class="green--text">55%</span>&nbsp;
            increase in today's sales
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          hover-reveal
          color="info"
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h3 class="card-title font-weight-light mt-2 ml-2">
            Completed Tasks
          </h3>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Last Last Campaign Performance
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
      >
        <base-material-card
          color="primary"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Demande d'Acces aux Projets
            </div>

            <div class="subtitle-1 font-weight-light">
              Nouvelle demande d'accees au projet
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="demands"
            >
              <template
                v-slot:item.action="{item}"
              >
                <v-row>
                  <v-col
                    cols="12"
                    md="2"
                  >
                    <v-btn
                      icon
                      color="success"
                      @click="accept(item)"
                    >
                      <v-icon
                        size="30"
                      >
                        mdi-checkbox-marked-circle-outline
                      </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col
                    cols="12"
                    md="2"
                  >
                    <v-btn
                      icon
                      color="error"
                      @click="refuse(item)"
                    >
                      <v-icon
                        size="30"
                      >
                        mdi-close
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </v-data-table>
          </v-card-text>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
      >
        <base-material-card
          class="px-5 py-3"
          color="secondary"
        >
          <template v-slot:heading>
            <v-tabs
              v-model="tabs"
              background-color="transparent"
              slider-color="white"
            >
              <v-tab class="mr-3">
                <v-icon class="mr-2">
                  mdi-code-tags
                </v-icon>
                Acces Autorisé
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">
                  mdi-bug
                </v-icon>
                Acces Refusé
              </v-tab>
            </v-tabs>
          </template>

          <v-tabs-items
            v-model="tabs"
            class="transparent"
          >
            <v-card-text>
              <template v-for="(demand, i) in demandsAccepted[tabs]">
                <v-row
                  :key="i"
                  align="center"
                >
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <span>
                      {{ demand.project.name }}
                    </span>
                  </v-col>
                  <v-col
                    cols="12"
                    md="2"
                  >
                    <span>
                      {{ demand.investisseur.prenom }}
                    </span>
                  </v-col>
                  <v-col
                    cols="12"
                    md="2"
                  >
                    <span>
                      {{ demand.investisseur.nom }}
                    </span>
                  </v-col>
                  <v-col
                    cols="2"
                    class="text-right"
                  >
                    <v-icon
                      size="30"
                      color="error"
                      class="mx-1"
                    >
                      mdi-close
                    </v-icon>
                  </v-col>
                </v-row>
              </template>
            </v-card-text>
          </v-tabs-items>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { firestore } from '@/main'
  import { mapMutations } from 'vuex'

  export default {
    name: 'DashboardCreateur',

    data () {
      return {
        dailySalesChart: {
          data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
              [12, 17, 7, 17, 23, 18, 38],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        dataCompletedTasksChart: {
          data: {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [
              [230, 750, 450, 300, 280, 240, 200, 190],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        emailsSubscriptionChart: {
          data: {
            labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],

            ],
          },
          options: {
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: 1000,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0,
            },
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                },
              },
            }],
          ],
        },
        headers: [
          {
            sortable: false,
            text: 'Name Project',
            value: 'project.name',
          },
          {
            sortable: false,
            text: 'First Name',
            value: 'investisseur.prenom',
          },
          {
            sortable: false,
            text: 'Last Name',
            value: 'investisseur.nom',
          },
          {
            sortable: false,
            text: 'Action',
            value: 'action',
          },
        ],
        demands: [],
        tabs: 0,
        demandsAccepted: {
          0: [],
          1: [],
        },
        list: {
          0: false,
          1: false,
          2: false,
        },
      }
    },
    computed: {
      uid () {
        return this.$store.state.user.uid
      },
      userData () {
        return this.$store.state.userData
      },
    },
    mounted () {
      this.getAccessDemands()
    },
    methods: {
      async accept (demand) {
        demand.project.accessDemand = demand.project.accessDemand.filter(item => item !== demand.investisseur.uid)
        demand.project.accessProject.push(demand.investisseur.uid)
        await firestore.collection('projects').doc(demand.project.uid).update({
          accessDemand: demand.project.accessDemand,
          accessProject: demand.project.accessProject,
        }).then(() => {
          this.getAccessDemands()
        })
      },
      refuse () {

      },
      async getAccessDemands () {
        this.demands = []
        this.demandsAccepted[0] = []
        for await (const projectID of this.userData.projects) {
          await firestore.collection('projects').doc(projectID).get().then(async project => {
            if (project.exists) {
              const projectData = project.data()
              projectData.uid = projectID
              for await (const investisseurID of projectData.accessDemand) {
                await firestore.collection('users').doc(investisseurID).get().then(investisseur => {
                  if (investisseur.exists) {
                    const investisseurData = investisseur.data()
                    investisseurData.uid = investisseurID
                    const res = {
                      project: projectData,
                      investisseur: investisseurData,
                    }
                    this.demands.push(res)
                  }
                })
              }
              this.setAccessDemands(this.demands.length)
              for await (const investisseurID of projectData.accessProject) {
                await firestore.collection('users').doc(investisseurID).get().then(investisseur => {
                  if (investisseur.exists) {
                    const investisseurData = investisseur.data()
                    investisseurData.uid = investisseurID
                    const res = {
                      project: projectData,
                      investisseur: investisseurData,
                    }
                    this.demandsAccepted[0].push(res)
                  }
                })
              }
            }
          })
        }
      },
      ...mapMutations({
        setAccessDemands: 'SET_ACCESS_DEMANDS',
      }),
    },
  }
</script>
