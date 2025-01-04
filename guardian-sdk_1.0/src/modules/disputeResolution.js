
const { pipeline } = require('@huggingface/transformers');

class DisputeResolution {
  constructor() {
    this.disputes = [];
    this.model = null;
    this.loadModel();
  }

  async loadModel() {
    this.model = await pipeline('zero-shot-classification', 'facebook/bart-large-mnli');
  }

  createDispute(initiator, details) {
    const dispute = {
      id: this.disputes.length + 1,
      initiator,
      details,
      status: 'pending',
    };
    this.disputes.push(dispute);
    return `Dispute created with ID ${dispute.id}`;
  }

  async resolveDisputeWithAI(disputeId) {
    const dispute = this.disputes.find(d => d.id === disputeId);
    if (!dispute) {
      return `Dispute ID ${disputeId} not found`;
    }

    const result = await this.model(dispute.details, ['resolved', 'rejected', 'pending']);
    return `Dispute ${disputeId} resolved with outcome: ${result.label}`;
  }

  resolveDisputeWithVoting(disputeId) {
    const disputeVotes = this.votes.filter(v => v.disputeId === disputeId);
    const votes = disputeVotes.reduce((acc, vote) => {
      acc[vote.vote] = (acc[vote.vote] || 0) + 1;
      return acc;
    }, {});

    const outcome = votes['yes'] > votes['no'] ? 'Resolved in favor of the initiator' : 'Resolved against the initiator';
    return `Dispute ${disputeId} resolved with outcome: ${outcome}`;
  }

  getDisputes() {
    return this.disputes;
  }
}

module.exports = DisputeResolution;
