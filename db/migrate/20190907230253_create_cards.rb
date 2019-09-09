class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :front
      t.string :back
      t.references :deck, null: false, foreign_key: true
      t.text :available_at
      t.integer :srs_stage, default: 0
      t.boolean :has_been_seen, default: false
      t.float :e_factor, default: 1.3

      t.timestamps
    end
  end
end
