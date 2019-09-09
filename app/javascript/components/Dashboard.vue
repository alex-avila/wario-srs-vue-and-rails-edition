<template>
  <div class="dashboard">
    <h3>Dashboard</h3>
    <div class="dashboard__wrapper">
      <!-- <div>
        <span>{{ nextReviewDate }}</span>
        <p>Next Review</p>
      </div> -->
      <div>
        <span>{{ cardsAvailableNow.length }}</span>
        <p>Available Now</p>
      </div>
      <!-- <div>
        <span>{{ cardsAvailableTomorrow }}</span>
        <p>Next Day</p>
      </div> -->
    </div>
    <h4>
      Percentage of cards seen <small>( {{ percentageText }}% )</small>
    </h4>
    <ProgressBar :percentage="percentage" />
  </div>
</template>

<script>
import ProgressBar from "./ProgressBar";
import { mapGetters } from "vuex";

export default {
  components: { ProgressBar },

  props: {
    deck: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters("cards", ["nextReviewDate", "cardsAvailableNow"]),

    percentage() {
      if (this.deck.cards.length) {
        const cardsSeenNum = this.deck.cards.filter(card => card.has_been_seen)
          .length;
        return (cardsSeenNum / this.deck.cards.length) * 100;
      }

      return 100;
    },

    percentageText() {
      return this.percentage !== 0 && this.percentage < 1
        ? "<1"
        : Math.round(this.percentage);
    }
  }
};

// class Dashboard extends Component {
//     render() {
//         const { cards } = this.props
//         const { availableNow, nextDay, nextReview } = this.props.dashboardData
//         let percentage = 0
//         let momentDate = 'never'
//         const areReviewsReady = new Date(nextReview).getUTCDate() === new Date(Date.now()).getUTCDate()
//         // reviews are ready but there are none available
//         if (areReviewsReady && availableNow === 0) {
//             momentDate = 'in a day'
//         } else if (areReviewsReady) {
//             momentDate = 'available now'
//         } else {
//             if (cards.length) {
//                 momentDate = moment(nextReview).fromNow()
//             } else {
//                 momentDate = 'never'
//             }
//         }
//         const seen = this.props.cards.reduce((final, card) => {
//             return card.hasBeenSeen ? final + 1 : final
//         }, 0)
//         percentage = (seen / this.props.cards.length) * 100
//         return (
//             <div className="dashboard">
//                 <h3>Dashboard</h3>
//                 <div className="dashboard__wrapper">
//                     <div>
//                         <span>
//                             {
//                                 new Date(nextReview) > Date.now() || !cards.length || new Date(nextReview).getUTCDate() === new Date(Date.now()).getUTCDate() ?
//                                     momentDate.slice(0, 1).toUpperCase() + momentDate.slice(1) :
//                                     'Available Now'
//                             }
//                         </span>
//                         <p>Next Review</p>
//                     </div>
//                     <div>
//                         <span>{availableNow ? availableNow : 0}</span>
//                         <p>Available Now</p>
//                     </div>
//                     <div>
//                         <span>{nextDay ? nextDay : 0}</span>
//                         <p>Next Day</p>
//                     </div>
//                 </div>
//                 <h4>
//                     Percentage of cards studied <small>({percentage !== 0 && percentage < 1 ?
//                         '<1' : Math.round(percentage)}%)</small>
//                 </h4>
//                 <ProgressBar percentage={percentage} />
//             </div>
//         );
//     }
// }

// export default Dashboard;
</script>

<style>
.dashboard__wrapper {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border: 1px solid #d8d8d8;
  background: #fff;
  margin: 1em 0;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard__wrapper div:first-child {
  grid-column: 1 / -1;
  border-bottom: 1px solid #d8d8d8;
}

.dashboard__wrapper div:nth-child(2) {
  grid-column: span 3;
}

.dashboard__wrapper div:last-child {
  grid-column: span 3;
}

.dashboard__wrapper div {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.dashboard__wrapper div:nth-child(2) {
  border-right: 1px solid #d8d8d8;
}

.dashboard__wrapper div span {
  display: block;
  padding: 0.618em 1em 0.5em;
  font-size: 22px;
  font-weight: 500;
}

.dashboard__wrapper div p {
  margin: 0;
  padding: 0 0 0.618em;
}

@media (min-width: 600px) {
  .dashboard__wrapper div:first-child {
    grid-column: span 2;
    border-bottom: none;
  }
  .dashboard__wrapper div:nth-child(2) {
    grid-column: span 2;
  }
  .dashboard__wrapper div:last-child {
    grid-column: span 2;
  }
  .dashboard__wrapper div:not(:last-child) {
    border-right: 1px solid #d8d8d8;
  }
}
</style>
