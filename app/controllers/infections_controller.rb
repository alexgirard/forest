class InfectionsController < ApplicationController 
  def create 
    infection = Infection.new
    infection.notes = params[:infection][:notes]
    infection.start = params[:infection][:start]
    infection.incubation = params[:infection][:incubation]
    infection.steps = params[:infection][:steps]
    patient = Patient.find(params[:infection][:patient_id])
    infection.patient = patient
    infection.save!
  end

  def show 
    infection = Infection.find(params[:id])
    render component: 'InfectionDetails', props: {infection: infection}
  end

  def update 
    infection = Infection.find(params[:id])
    infection.update_attributes(params.require(:infection).permit(:notes, :start, :end, :incubation, :steps, :hai, :status))
    redirect_to dashboard_path
  end

  def destroy 
    infection = Infection.find(params[:id])
    infection.destroy
    redirect_to dashboard_path
  end
end